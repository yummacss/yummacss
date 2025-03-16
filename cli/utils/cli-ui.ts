import ora from "ora";

export const spinner = ora({
  spinner: "dots",
});

export const cli = {
  success: (msg: string) => console.log(`✔ ${msg}`),
  info: (msg: string) => console.log(`ℹ ${msg}`),
  error: (msg: string) => console.log(`✗ ${msg}`),
  startSpinner: (text: string) => {
    const spinner = ora({ spinner: "dots" }).start(text);
    return spinner;
  },
};
