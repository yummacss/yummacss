import ora from "ora";
const spinner = ora({
    spinner: "sand",
});
const cli = {
    success: (msg) => console.log(`✔ ${msg}`),
    info: (msg) => console.log(`ℹ ${msg}`),
    error: (msg) => console.log(`✗ ${msg}`),
    startSpinner: (text) => {
        const spinner = ora({ spinner: "sand", color: "white" }).start(text);
        return spinner;
    },
};
export { spinner, cli };
