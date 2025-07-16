import ora from "ora";
export const spinner = ora({
    spinner: "sand",
});
export const cli = {
    success: (msg) => console.log(`✔ ${msg}`),
    info: (msg) => console.log(`ℹ ${msg}`),
    error: (msg) => console.log(`✗ ${msg}`),
    startSpinner: (text) => {
        const spinner = ora({ spinner: "sand", color: "white" }).start(text);
        return spinner;
    },
};
