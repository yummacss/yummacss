import ora from "ora";
export const spinner = ora({
    spinner: "dots",
});
export const cli = {
    success: (msg) => console.log(`✔ ${msg}`),
    info: (msg) => console.log(`ℹ ${msg}`),
    error: (msg) => console.log(`✗ ${msg}`),
    startSpinner: (text) => {
        const spinner = ora({ spinner: "dots" }).start(text);
        return spinner;
    },
};
