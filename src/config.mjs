/**Configuration file for global variables needed for the script*/

/**
 * @description The csv file containing all the current people going this week.
 */
const _CURRENT_WEEK_SANITIZED = './names.csv';

/**
 * @description The name of the folder containing all the submissions (this will truncate to only those going this week after the script runs)
 */
const _THIS_WEEK = './current';

/**
 * @description The people who aren't going this week will be placed into this folder
 */
const _NOT_NEEDED_THIS_WEEK = './not_current';

/**
 * @description The delimitation character used by CourseLink to space out the file names.
 */
const _CL_GLOBAL_DELIM = ' - ';

/**
 * @description Files for the tool to ignore/not try to move / rename.
 */
const _IGNORED_FILES = ['.DS_Store', 'excluded_export.json', 'included_export.json', 'index.html'];


export {_CURRENT_WEEK_SANITIZED, _THIS_WEEK, _NOT_NEEDED_THIS_WEEK, _CL_GLOBAL_DELIM, _IGNORED_FILES}