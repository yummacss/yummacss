import ora from "ora";

const spinner = ora({
  spinner: "sand",
});

const cli = {
  success: (msg: string) => console.log(`[success] ${msg}`),
  info: (msg: string) => console.log(`[info] ${msg}`),
  error: (msg: string) => console.log(`[error] ${msg}`),
  startSpinner: (text: string) => {
    const spinner = ora({ spinner: "sand", color: "white" }).start(text);
    return spinner;
  },
};

export { cli, spinner };
