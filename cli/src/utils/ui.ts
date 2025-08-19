import ora from "ora";

const spinner = ora({
  spinner: "sand",
});

const ui = {
  success: (msg: string) => console.log(`✔ ${msg}`),
  info: (msg: string) => console.log(`ℹ ${msg}`),
  error: (msg: string) => console.log(`✗ ${msg}`),
  startSpinner: (text: string) => {
    const spinner = ora({ spinner: "sand", color: "white" }).start(text);
    return spinner;
  },
};

export { ui, spinner };
