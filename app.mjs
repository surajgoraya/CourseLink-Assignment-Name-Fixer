/**
 * @name CourseLinkFixer
 * @file app.mjs
 * @description The entry point for the CourseLink fixer script.
 * @author @surajgoraya <me@surajgoraya.ca>
 * @version 0.0.2
 */

import internal from './package.json' assert { type: "json" };

import {
    removeUnneededFiles,
    renameFiles,
    getNames
} from './functions.mjs';

log(`- CourseLink Fixer x V ${internal.version} - `, 'big');

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