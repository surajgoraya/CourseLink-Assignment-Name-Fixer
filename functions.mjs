import {
    open,
    readdir,
    rename,
    mkdir,
    writeFile,
} from 'node:fs/promises';

import { parse } from 'csv-parse';
import { correct_name_orientation, log } from './lib.mjs';
import { close, existsSync, fstatSync, openSync } from 'node:fs';
import path from 'node:path';

import {
    _CURRENT_WEEK_SANITIZED, 
    _THIS_WEEK, _NOT_NEEDED_THIS_WEEK,
     _CL_GLOBAL_DELIM, 
     _IGNORED_FILES
} from './config.mjs'


/**
 * Removes all the people from the CourseLink downloads folder who aren't going in this week's presentation order.
 * @param {String[]} sorted_names The array of names of people going this week.
 */
async function removeUnneededFiles(sorted_names) {
    const currentFiles = await readdir(_THIS_WEEK);

    try {
        await mkdir(path.join(_NOT_NEEDED_THIS_WEEK));
    } catch {}
    
    const included = [];
    const excluded = [];
    
    for (const fileName of currentFiles) {
        
        if(_IGNORED_FILES.includes(fileName)){log('Skipping Ignored File - ' + fileName, 'debug'); continue;}

        const splitFileName = fileName.split(_CL_GLOBAL_DELIM);
        const studentName = splitFileName[1];
        const timeSubmitted = splitFileName[4]; 
        
        if(!sorted_names.includes(correct_name_orientation(studentName))){
            
            excluded.push ({fullName: fileName, time: timeSubmitted, name: correct_name_orientation(studentName)});
            
            let return_code = await rename(`${_THIS_WEEK}/${fileName}`, `${_NOT_NEEDED_THIS_WEEK}/${fileName}`);
            if(return_code){
                log('Something went wrong while cleaning up the files...', 'error');
                process.exit(1);
            }
        } else {
            included.push ({fullName: fileName, time: timeSubmitted, name: correct_name_orientation(studentName)});
        }
    }

    writeFile(`${_THIS_WEEK}/excluded_export.json`, JSON.stringify(excluded));
    writeFile(`${_THIS_WEEK}/included_export.json`, JSON.stringify(included));
}


/**
 * Renames all the files within the current week's presentation folder to be in the presentation order.
 * This includes stripping out all identifiers from the file name, leaving just the submission file name
 * with a prefix of the order.
 * @example
 * "#####-##### - Last, First - ##### - userid - Feb 8, 2023 1128 PM - Last_First_Ex04.pdf" 
 * -> "1 - Last_First_Ex04.pdf"
 * @param {String[]} sorted_names The array of names of people going this week.
 */
async function renameFiles (sorted_names) {
    const currentFiles = await readdir(_THIS_WEEK);
    for (const fileName of currentFiles){
        
        if(_IGNORED_FILES.includes(fileName)){log('Skipping Ignored File - ' + fileName, 'debug'); continue;}

        const splitFileName = fileName.split(_CL_GLOBAL_DELIM);
        const s_index = sorted_names.findIndex((studentName)=> studentName === correct_name_orientation(splitFileName[1]));
        const correct_file_name = `${_THIS_WEEK}/${s_index} - ${splitFileName[5]}`;
        
        if(!existsSync(correct_file_name)){
            let return_code = await rename(`${_THIS_WEEK}/${fileName}`, correct_file_name);
            if(return_code){
                log('Something went wrong while renaming the files...', 'error');
                process.exit(1);
            }
        } else {
            log('WARN - Looks like a file already exists in the directory with the name ' + correct_file_name, 'warn');
            log('WARN - Going to compare the dates and save the newest one...', 'warn');

            const moved_file = openSync(correct_file_name);
            const to_be_moved = openSync(`${_THIS_WEEK}/${fileName}`);

            const m_openTime = fstatSync(moved_file);
            const t_openTime = fstatSync(to_be_moved);
            
            if(t_openTime.mtime > m_openTime.mtime){
                close(moved_file);
                close(to_be_moved);
                let return_code = await rename(`${_THIS_WEEK}/${fileName}`, correct_file_name);
                if(return_code){
                    log('Something went wrong while renaming the files...', 'error');
                    process.exit(1);
                }
            } else {
                close(moved_file);
                close(to_be_moved);
            }
        }

    }

}

/**
 * Gets the names out of the sanitized CSV list.
 * @returns {String[]} An array of all the names going this week.
 */
async function getNames() {
    const file = await open(`${_CURRENT_WEEK_SANITIZED}`, 'r');
    const data = await file.readFile({ encoding: 'utf-8' });
    const _ALL_NAMES = [];

    parse(data, {
        delimiter: ','
    }, function (err, records) {
        if (err) {
            log('An Error occurred! - Exiting.', 'error');
            process.exit(1);
        }
        for (const record of records) {
            _ALL_NAMES.push(record[0]);
        }
    });
    await file.close();
    return _ALL_NAMES;
}


export {getNames, renameFiles, removeUnneededFiles};