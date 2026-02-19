import { createSpinner } from "nanospinner";

export const progress = (msg: string) => createSpinner(msg).start();

export const fail = (msg: string) => createSpinner().error({ text: msg });
export const info = (msg: string) => createSpinner().warn({ text: msg });
export const success = (msg: string) => createSpinner().success({ text: msg });
export const warn = (msg: string) => createSpinner().warn({ text: msg });

export const cli = {
	fail,
	info,
	progress,
	success,
	warn,
};
