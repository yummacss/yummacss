import { relative } from "node:path";
import { type ValidateOptions, validate } from "./index";

function parseArgs(argv: string[]): ValidateOptions {
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

try {
	const result = await validate(parseArgs(process.argv.slice(2)));

	console.info(
		`Scanned ${result.files} files and found ${result.classes} unique classes.`,
	);

	if (result.invalid.length === 0) {
		console.info("All classes are valid.");
	} else {
		console.error(
			`Found ${result.invalid.length} classes Yumma CSS does not recognize:`,
		);
		for (const { className, files } of result.invalid) {
			console.error(` "${className}"`);
			for (const file of files) {
				console.error(`  - ${relative(process.cwd(), file)}`);
			}
		}
		console.error(
			'Fix the classes above, or pass --allow "class-a,class-b" for custom classes.',
		);
		process.exit(1);
	}
} catch (error) {
	console.error(error instanceof Error ? error.message : String(error));
	process.exit(1);
}
