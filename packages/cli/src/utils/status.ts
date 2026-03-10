const prefix = "[Yumma CSS]";

function clearLine() {
	if (process.stdout.isTTY) {
		process.stdout.write("\x1b[2K\x1b[0G");
	}
}

export const progress = (msg: string) => {
	console.log(`${prefix}: ${msg}`);

	return {
		succeed: (text?: string) => {
			clearLine();
			console.log(`${prefix} Done: ${text || msg}`);
		},
		fail: (text?: string) => {
			clearLine();
			console.error(`${prefix} Error: ${text || msg}`);
		},
		warn: (text?: string) => {
			clearLine();
			console.warn(`${prefix} Warn: ${text || msg}`);
		},
		info: (text?: string) => {
			clearLine();
			console.info(`${prefix} Info: ${text || msg}`);
		},
		stop: () => {
			clearLine();
		},
	};
};

export const fail = (msg: string) => console.error(`${prefix} Error: ${msg}`);
export const info = (msg: string) => console.info(`${prefix} Info: ${msg}`);
export const success = (msg: string) => console.log(`${prefix} Done: ${msg}`);
export const warn = (msg: string) => console.warn(`${prefix} Warn: ${msg}`);

export const cli = {
	fail,
	info,
	progress,
	success,
	warn,
};
