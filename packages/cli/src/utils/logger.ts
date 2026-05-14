const S = {
 active: "●",
 done: "✓",
 error: "✗",
	processing: "◉",
	waiting: "○",
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
	const line = `${symbol} ${msg}`;
	if (stream === "stderr") {
		process.stderr.write(`${line}\n`);
	} else {
		process.stdout.write(`${line}\n`);
	}
}

function spinner(msg: string) {
	print(S.waiting, msg);

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

function printTree(files: string[], basePath: string = "") {
	if (files.length === 0) return;

	const displayFiles = files.slice(0, 10);
	const remaining = files.length - 10;

	displayFiles.forEach((file, index) => {
		const isLast = index === displayFiles.length - 1 && remaining <= 0;
		const prefix = isLast ? "└" : "├";

		const relativePath = basePath
			? file.replace(basePath, "").replace(/^[/\\]/, "")
			: file;

		print(prefix, relativePath);
	});

	if (remaining > 0) {
		print("", `+ ${remaining} more files`);
	}
}

export const logger = {
	header(version: string) {
		process.stdout.write(`${S.active} Yumma CSS ${version}\n`);
	},
	fail(msg: string) {
		print(S.error, msg, "stderr");
	},

	build: {
		start() {
			return spinner("Collecting classes...");
		},
		success(time: number, collected: number) {
			return `Collected ${collected.toLocaleString()} classes in ${time}ms`;
		},
		fail(error?: unknown) {
			const msg =
				error instanceof Error
					? error.message
					: "Check your files & try again.";
			return `Something went wrong. ${msg}`;
		},
		compiling(files: string[]) {
			print(S.processing, "Compiling CSS...");
			printTree(files);
			return {
				success: (output: string, size: number) => {
					print(S.done, `Generated ${output} (${(size / 1024).toFixed(1)}KB)`);
				},
				fail: (error?: unknown) => {
					const msg =
						error instanceof Error
							? error.message
							: "Check your files & try again.";
					return `Compilation failed. ${msg}`;
				},
			};
		},
		written(time: number) {
			return `Done in ${time}ms`;
		},
	},

	watch: {
		start() {
			return spinner("Collecting classes...");
		},
		success(collected: number) {
			return `Watching for changes. (${collected.toLocaleString()} classes)`;
		},
		fail() {
			return "Something went wrong. Check your files & try again.";
		},
		compiling(files: string[]) {
			print(S.processing, "Compiling CSS...");
			printTree(files);
			return {
				success: (output: string, size: number) => {
					print(S.done, `${output} (${(size / 1024).toFixed(1)}KB)`);
				},
				fail: () => {
					print(S.error, "Failed to compile. Check your files.");
				},
			};
		},
	},

	init: {
		start() {
			return spinner("Initializing...");
		},
		success(filename: string) {
			return `Created ${filename}`;
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
