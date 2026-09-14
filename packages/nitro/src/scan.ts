import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { glob } from "tinyglobby";
import { tokenizer } from "./tokenizer";

export interface ScanResult {
	classes: Set<string>;
	files: string[];
}

export interface ScanOptions {
	cwd?: string;
}

export async function scan(
	patterns: string[],
	options: ScanOptions = {},
): Promise<ScanResult> {
	const matches = await glob(patterns, {
		cwd: options.cwd,
		absolute: true,
	});
	const files = matches.map((file) => resolve(file));
	const classes = new Set<string>();

	for (const file of files) {
		try {
			const content = readFileSync(file, "utf-8");
			const tokens = tokenizer(content, file);
			tokens.forEach((token) => {
				classes.add(token);
			});
		} catch {}
	}

	return { classes, files };
}
