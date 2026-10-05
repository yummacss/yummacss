import { relative } from "node:path";
import { type LintOptions, lintProject } from "@/services/lint";

function parseArgs(argv: string[]): LintOptions {
	const allowlist: string[] = [];
	let configPath: string | undefined;

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === "--allow" || arg === "-a") {
			const value = argv[++i];
			if (value) {
				allowlist.push(...value.split(",").map((entry) => entry.trim()));
			}
		} else if (arg === "--config" || arg === "-c") {
			configPath = argv[++i];
		}
	}

	return { allowlist, configPath };
}

export async function lint(argv: string[]) {
	const result = await lintProject(parseArgs(argv));

	console.info(
		`Scanned ${result.files} files and found ${result.classes} unique classes.`,
	);

	if (result.invalid.length === 0) {
		console.info("All classes are valid.");
		return;
	}

	console.error(
		`Found ${result.invalid.length} classes Yumma CSS does not recognize:`,
	);

	// 3.x classes are rewritten by the codemod, not fixed one at a time
	const legacy = result.invalid.filter((entry) => entry.legacy);
	if (legacy.length > 0) {
		const examples = legacy
			.slice(0, 3)
			.map(({ className, suggestion }) => `"${className}" is "${suggestion}"`)
			.join(", ");
		console.error(
			` ${legacy.length} are Yumma CSS 3.x classes (${examples}). Run "pnpm dlx yummacss migrate" to rewrite them all.`,
		);
	}

	const rest = result.invalid.filter((entry) => !entry.legacy);
	for (const { className, files, suggestion } of rest) {
		console.error(
			suggestion
				? ` "${className}" - did you mean "${suggestion}"?`
				: ` "${className}"`,
		);
		for (const file of files) {
			console.error(`  - ${relative(process.cwd(), file)}`);
		}
	}
	if (rest.length > 0) {
		console.error(
			'Fix the classes above, or pass --allow "class-a,class-b" for custom classes.',
		);
	}
	process.exitCode = 1;
}
