import ora from "ora";

export const progress = (msg: string) =>
  ora({ spinner: "sand", color: "white" }).start(msg);

export const fail = (msg: string) => ora().fail(msg);
export const info = (msg: string) => ora().info(msg);
export const success = (msg: string) => ora().succeed(msg);
export const warn = (msg: string) => ora().warn(msg);

export const cli = {
  error: fail,
  info,
  progress,
  success,
  warn,
};