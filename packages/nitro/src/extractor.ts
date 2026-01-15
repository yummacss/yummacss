import { readFileSync } from "node:fs";
import { globby } from "globby";
import { tokenizer } from "./tokenizer";

export async function extractor(patterns: string[]): Promise<Set<string>> {
	const files = await globby(patterns);
	const classSet = new Set<string>();

	for (const file of files) {
		try {
			const content = readFileSync(file, "utf-8");
			const tokens = tokenizer(content);
			tokens.forEach((token) => {
				classSet.add(token);
			});
		} catch {}
	}

	return classSet;
}
