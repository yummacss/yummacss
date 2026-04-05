const S = {
	brand: "◪",
	done: "✓",
	error: "✕",
	progress: "-",
} as const;

function clearLine() {
	if (process.stdout.isTTY) {
		process.stdout.write("\x1b[2K\x1b[0G");
	}
}

function print(
	symbol: string,
	msg: string,
	stream: "stdout" | "stderr" = "stdout",
) {
	const line = ` ${symbol} ${msg}`;
	if (stream === "stderr") {
		process.stderr.write(`${line}\n`);
	} else {
		process.stdout.write(`${line}\n`);
	}
}

function spinner(msg: string) {
	print(S.progress, msg);

	return {
		succeed: (text: string) => {
			clearLine();
			print(S.done, text);
		},
		fail: (text: string) => {
			clearLine();
			print(S.error, text, "stderr");
		},
		stop: () => {
			clearLine();
		},
	};
}

export const logger = {
	header(version: string) {
		process.stdout.write(
			`\n \x1b[1m${S.brand} Yumma CSS ${version}\x1b[22m\n\n`,
		);
	},
	fail(msg: string) {
		print(S.error, msg, "stderr");
	},

	build: {
		start() {
			return spinner("Extracting classes...");
		},
		success(time: number, output: string) {
			return `Done in ${time} ms. (${output})`;
		},
		fail(error?: unknown) {
			return `Something went wrong. ${error instanceof Error ? error.message : "Check your files & try again."}`;
		},
	},
	watch: {
		start() {
			return spinner("Extracting classes...");
		},
		success(output: string) {
			return `Watching for changes. (${output})`;
		},
		fail() {
			return "Something went wrong. Check your files & try again.";
		},
	},
	init: {
		start() {
			return spinner("Initializing...");
		},
		success(filename: string) {
			return `Created ${filename}.`;
		},
		fail() {
			return "Something went wrong. Check the docs & try again.";
		},
		notFound() {
			return "No config found. Run 'yummacss init' to create one.";
		},
		invalid() {
			return "Invalid config. Check the syntax & try again.";
		},
	},
};
