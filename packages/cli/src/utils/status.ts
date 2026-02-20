import { createSpinner } from "nanospinner";

export const progress = (msg: string) => {
	const spinner = createSpinner(msg).start();
	return {
		succeed: (text?: string) => spinner.success({ text: text || msg }),
		fail: (text?: string) => spinner.error({ text: text || msg }),
		warn: (text?: string) => spinner.warn({ text: text || msg }),
		info: (text?: string) =>
			spinner.reset().update({ text: `ℹ ${text || msg}` }),
		stop: () => spinner.reset(),
	};
};

export const fail = (msg: string) => createSpinner().error({ text: msg });
export const info = (msg: string) =>
	createSpinner()
		.reset()
		.update({ text: `ℹ ${msg}` });
export const success = (msg: string) => createSpinner().success({ text: msg });
export const warn = (msg: string) => createSpinner().warn({ text: msg });

export const cli = {
	fail,
	info,
	progress,
	success,
	warn,
};
