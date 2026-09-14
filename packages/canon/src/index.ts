import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
	type Config,
	loadConfig,
	suggestClasses,
	validateClasses,
} from "@yummacss/nitro";
import { glob } from "tinyglobby";

export interface ValidateOptions {
	cwd?: string;

	configPath?: string;

	config?: Config;

	allowlist?: string[];
}

export interface InvalidClass {
	className: string;
	files: string[];
	suggestion?: string;
}

export interface ValidateResult {
	files: number;

	classes: number;

	invalid: InvalidClass[];
}

const classRegexes = [
	/class(?:Name)?\s*=\s*["']([^"']+)["']/g,
	/class(?:Name)?=\{["']([^"']+)["']\}/g,
	/class(?:Name)?=\{`([^`]+)`\}/g,
	/\b(?:cn|clsx|classnames|cva)\s*\(\s*["'`]([^"'`]+)["'`]/g,
];

const classNamePattern = /^@?[a-z][a-zA-Z0-9@:/.%-]*$/;

export function extractClasses(content: string): Set<string> {
	const classes = new Set<string>();

	for (const regex of classRegexes) {
		regex.lastIndex = 0;
		let match = regex.exec(content);
		while (match !== null) {
			const value = (match[1] ?? "").replace(/\$\{[^}]*\}/g, " ");
			for (const className of value.split(/\s+/)) {
				if (className && classNamePattern.test(className)) {
					classes.add(className);
				}
			}
			match = regex.exec(content);
		}
	}

	return classes;
}

export async function validate(
	options: ValidateOptions = {},
): Promise<ValidateResult> {
	const cwd = options.cwd ?? process.cwd();
	const { config } = await loadConfig({
		cwd,
		path: options.configPath,
		config: options.config,
	});

	const matches = await glob(config.source ?? [], { cwd, absolute: true });
	const files = matches.map((file) => resolve(file));

	const classFiles = new Map<string, Set<string>>();
	for (const file of files) {
		let content: string;
		try {
			content = readFileSync(file, "utf-8");
		} catch {
			continue;
		}

		for (const className of extractClasses(content)) {
			let entry = classFiles.get(className);
			if (!entry) {
				entry = new Set();
				classFiles.set(className, entry);
			}
			entry.add(file);
		}
	}

	const allowlist = new Set(options.allowlist ?? []);
	const candidates = Array.from(classFiles.keys()).filter(
		(className) => !allowlist.has(className),
	);
	const { invalid } = validateClasses(candidates, config);
	const suggestions = suggestClasses(invalid, config);

	return {
		files: files.length,
		classes: classFiles.size,
		invalid: invalid.sort().map((className) => ({
			className,
			files: Array.from(classFiles.get(className) ?? []).sort(),
			suggestion: suggestions.get(className),
		})),
	};
}
