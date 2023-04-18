/**
 * @name CourseLinkFixer
 * @file app.mjs
 * @description The entry point for the CourseLink fixer script.
 * @author gorayas
 * @version 0.0.2
 */

import internal from './package.json' assert { type: "json" };

import { log } from './src/lib.mjs';

import {
    removeUnneededFiles,
    renameFiles,
    getNames
} from './src/functions.mjs';

/**
 * This function acts as a wrapper for the script. This is only done to make 
 * the script compatible with the packaging and minifying tools used to make the
 * script executable outside of the node.js environment.
 * 
 * These packagers don't yet support esmodules, and have no support for top-level
 * await.
 */
async function run() {

    log(`- CourseLink Fixer x V ${internal.version} - `, 'big');
    log(`Source & Instructions Available at: https://github.com/surajgoraya`, 'note');
    log('Starting...', 'info');
    log('Importing sanitized names file...', 'debug');

    const sorted_names = await getNames();
    if (sorted_names.length) {
        log('Read names, keeping only needed files...', 'success');
        await removeUnneededFiles(sorted_names);

        log('Files not needed for this week moved, renaming...', 'success');
        await renameFiles(sorted_names);
    } else {
        log('Names File Empty! - Exiting.', 'error');
        process.exit(1);
    }

    log('Done!', 'success');
}

run();