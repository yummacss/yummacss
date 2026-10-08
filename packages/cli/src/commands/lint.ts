import { relative } from "node:path";
import * as p from "@clack/prompts";
import { m } from "../messages";
import { type LintOptions, lintProject } from "../services/lint";
import { c, fail, intro, outro, say, tag } from "../ui";

export async function lint(options: LintOptions): Promise<number> {
	intro();
	try {
		const result = await lintProject(options);
		say.done("scan", m.build.scanned(result.files, result.classes));

		if (result.invalid.length === 0) {
			outro("done", m.lint.clean);
			return 0;
		}

		const lines = result.invalid.flatMap(({ className, files, suggestion }) => [
			m.lint.suggestion(className, suggestion),
			...files.map((file) => `  ${c.dim(relative(process.cwd(), file))}`),
		]);
		say.error(
			"invalid",
			`${m.lint.invalid(result.invalid.length)}\n${lines.join("\n")}`,
		);
		p.cancel(tag("next", m.lint.allow()));
		return 1;
	} catch (error) {
		return fail(error);
	}
}
