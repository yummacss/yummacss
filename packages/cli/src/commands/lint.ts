import { relative } from "node:path";
import { type LintOptions, lintProject } from "@/services/lint";

export async function lint(options: LintOptions) {
	const result = await lintProject(options);

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
	for (const { className, files, suggestion } of result.invalid) {
		console.error(
			suggestion
				? ` "${className}" - did you mean "${suggestion}"?`
				: ` "${className}"`,
		);
		for (const file of files) {
			console.error(`  - ${relative(process.cwd(), file)}`);
		}
	}
	console.error(
		'Fix the classes above, or pass --allow "class-a,class-b" for custom classes.',
	);
	process.exitCode = 1;
}
