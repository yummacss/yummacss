const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function clearLine() {
	if (process.stdout.isTTY) {
		process.stdout.write("\x1b[2K\x1b[0G");
	}
}

export const progress = (msg: string) => {
	let i = 0;
	let interval: NodeJS.Timeout | null = null;

	if (process.stdout.isTTY) {
		interval = setInterval(() => {
			clearLine();
			process.stdout.write(`\x1b[36m${frames[i]}\x1b[0m ${msg}`);
			i = (i + 1) % frames.length;
		}, 80);
	} else {
		console.log(`\x1b[36m⠋\x1b[0m ${msg}`);
	}

	return {
		succeed: (text?: string) => {
			if (interval) clearInterval(interval);
			clearLine();
			console.log(`\x1b[32m✔\x1b[0m ${text || msg}`);
		},
		fail: (text?: string) => {
			if (interval) clearInterval(interval);
			clearLine();
			console.log(`\x1b[31m✖\x1b[0m ${text || msg}`);
		},
		warn: (text?: string) => {
			if (interval) clearInterval(interval);
			clearLine();
			console.log(`\x1b[33m⚠\x1b[0m ${text || msg}`);
		},
		info: (text?: string) => {
			if (interval) clearInterval(interval);
			clearLine();
			console.log(`\x1b[34mℹ\x1b[0m ${text || msg}`);
		},
		stop: () => {
			if (interval) clearInterval(interval);
			clearLine();
		},
	};
};

export const fail = (msg: string) => console.log(`\x1b[31m✖\x1b[0m ${msg}`);
export const info = (msg: string) => console.log(`\x1b[34mℹ\x1b[0m ${msg}`);
export const success = (msg: string) => console.log(`\x1b[32m✔\x1b[0m ${msg}`);
export const warn = (msg: string) => console.log(`\x1b[33m⚠\x1b[0m ${msg}`);

export const cli = {
	fail,
	info,
	progress,
	success,
	warn,
};
