import ora from "ora";
import chalk from "chalk";
export const spinner = ora();
const { green, yellow, cyan, red } = chalk;
export const ui = {
    success: (msg) => console.log(green(`✓ ${msg}`)),
    warn: (msg) => console.log(yellow(`⚠ ${msg}`)),
    info: (msg) => console.log(cyan(`ℹ ${msg}`)),
    error: (msg) => console.log(red(`✗ ${msg}`)),
    startSpinner: (text) => {
        spinner.text = text;
        spinner.start();
        return spinner;
    },
};
