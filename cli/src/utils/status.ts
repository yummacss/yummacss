import ora from "ora";

const spinner = (text: string) =>
  ora({ spinner: "sand", color: "white" }).start(text);

const cli = {
  success: (msg: string) => console.log(`[success] ${msg}`),
  info: (msg: string) => console.log(`[info] ${msg}`),
  error: (msg: string) => console.log(`[error] ${msg}`),
  progress: spinner,
};

export { cli, spinner };
