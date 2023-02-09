import chalk from 'chalk';

/**
* Logs things out to the console with a standardized prefix
 * @param {String} text String of text you would like to log
 * @param {('error'|'debug'|'info'|'warn'|'success'|'big')} type Type of console message you want to print, this will change the colour.
 */
const log = (text, type) => {
    switch (type) {
        case 'error':
            console.log(`[CourseLink Fixer]: ${chalk.red(text)}`);
            break;
        case 'big':
            console.log(`${chalk.bold(chalk.blueBright(text))}`);
            break;
        case 'info':
            console.log(`[CourseLink Fixer]: ${chalk.blueBright(text)}`);
            break;
        case 'warn':
            console.log(`[CourseLink Fixer]: ${chalk.yellow(text)}`);
            break;
        case 'success':
            console.log(`[CourseLink Fixer]: ${chalk.green(text)}`);
            break;
        default:
            console.log(`${chalk.dim('[CourseLink Fixer]: ' + text)}`);
            break;
    }
}



/**
 * Puts Last, First name style to First Last style as in the sheet.
 * @param {String} nameWithComma Last, First name as exported by CourseLink
 */
const correct_name_orientation = (nameWithComma) => {
    const split_name = nameWithComma.split(',');
    return `${split_name[1].trim()} ${split_name[0].trim()}`
}
export { log, correct_name_orientation }