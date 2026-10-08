// every sentence the CLI prints, grouped by command
import { c, plural } from "./ui";

const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

export const m = {
	cli: {
		unknownOption: (option = "") => `Unknown option ${option}.`,
		unknownCommand: (command = "") => `Unknown command "${command}".`,
		seeHelp: "Run yummacss --help.",
	},

	help: (version: string) => {
		const row = (name: string, text: string) =>
			`  ${c.accent(name.padEnd(22))}${text}`;

		return `
${c.bold("yummacss")} ${c.dim(`v${version}`)}  Builds the CSS your classes use.

${c.bold("Usage")}  yummacss <command> [options]

${c.bold("Commands")}
${row("init, i", "Write yumma.config.mjs")}
${row("build, b", "Build the CSS once")}
${row("watch, w", "Build, then rebuild on every change")}
${row("lint, l", "Find classes Yumma CSS does not generate")}
${row("migrate, m", "Rewrite 3.x classes into the 4.x syntax")}

${c.bold("Options")}
${row("-c, --config <path>", "A config other than yumma.config.mjs")}
${row("-a, --allow <classes>", "lint: classes to accept, comma separated")}
${row("--dry-run", "migrate: report, without writing")}
${row("--force", "init: replace yumma.config.mjs")}
`;
	},

	config: {
		missing: (file: string) =>
			`No ${file} here. Run ${c.accent("yummacss init")} to create one.`,
		invalid: (file: string, reason: string) =>
			`${file} is not a valid config. ${reason}`,
		noOutput: (file: string) =>
			`${file} has no output, so there is nowhere to write the CSS.`,
	},

	init: {
		exists: (file: string) =>
			`${file} exists. ${c.accent("--force")} replaces it.`,
		next: () =>
			`Run ${c.accent("yummacss build")}, or ${c.accent("yummacss watch")} while you work`,
	},

	build: {
		scanned: (files: number, classes: number) =>
			`${plural(files, "file")}, ${plural(classes, "class")}`,
		written: (file: string, bytes: number) => `${file} ${c.dim(kb(bytes))}`,
		done: (ms: number) => `Built in ${ms} ms`,
	},

	watch: {
		waiting: "Waiting for changes. Ctrl+C stops.",
		rebuilt: (file: string, output: string, bytes: number, ms: number) =>
			`${file} ${c.dim("changed,")} ${output} ${c.dim(`${kb(bytes)} in ${ms} ms`)}`,
		failed: (reason: string) => `${reason} Fix it and save again.`,
	},

	lint: {
		clean: "Every class is one Yumma CSS generates.",
		invalid: (n: number) => `${plural(n, "class")} Yumma CSS does not generate`,
		suggestion: (name: string, near?: string) =>
			near ? `${name} ${c.dim("did you mean")} ${near}?` : name,
		allow: () =>
			`Fix them, or accept your own with ${c.accent('--allow "class-a,class-b"')}`,
	},

	migrate: {
		rewrote: (classes: number, files: number, dry: boolean) =>
			`${dry ? "Would rewrite" : "Rewrote"} ${plural(classes, "class")} in ${plural(files, "file")}`,
		skipped: (token: string, reason: string) => `${token} ${c.dim(reason)}`,
		skippedNote: "Left as they are. Rewrite these by hand.",
		dryRun: () =>
			`Nothing written. Run without ${c.accent("--dry-run")} to apply.`,
		done: "3.x classes rewritten",
	},
};
