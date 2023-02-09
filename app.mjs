import { parse } from 'csv-parse';
import { correct_name_orientation, log } from './lib.mjs';
import internal from './package.json' assert { type: "json" };

import {
    open,
    readdir,
    rename,
    mkdir,
    writeFile,
} from 'node:fs/promises';

import { close, existsSync, fstatSync, openSync } from 'node:fs';

import path from 'node:path';

const _CURRENT_WEEK_SANITIZED = './names.csv';
const _THIS_WEEK = './current';
const _NOT_NEEDED_THIS_WEEK = './not_current';
const _CL_GLOBAL_DELIM = ' - ';
const _IGNORED_FILES = ['.DS_Store', 'excluded_export.json', 'included_export.json', 'index.html'];


log(`- CourseLink Fixer x V ${internal.version} - `, 'big');

log('Starting...', 'info');
log('Importing sanitized names file...', 'debug');

const sorted_names = await getNames();

if (sorted_names.length) {
    log('Read names, keeping only needed files...', 'success');
    await remove_unneeded(sorted_names);
    
    log('Files not needed for this week moved, renaming...', 'success');
    await rename_files(sorted_names);
} else {
    log('Names File Empty! - Exiting.', 'error');
    process.exit(1);
}

log('Done!', 'success');

async function remove_unneeded(sorted_names) {
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
 * 
 * @param {Array} sorted_names 
 */
async function rename_files (sorted_names) {
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