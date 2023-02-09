/**
 * Logs things out to the console with a standardized prefix
 * @param {String} text String of text you would like to log
 */
const log = (text) => { console.log(`[CourseLink Fixer]: ${text}`)}

/**
 * Puts Last, First name style to First Last style as in the sheet.
 * @param {String} nameWithComma Last, First name as exported by CourseLink
 */
const correct_name_orientation = (nameWithComma) => {
    const split_name = nameWithComma.split(',');
    return `${split_name[1].trim()} ${split_name[0].trim()}`
} 
export {log, correct_name_orientation}