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
	/**
	 * Directory to resolve the config file and source globs from.
	 *
	 * @default process.cwd()
	 */
	cwd?: string;

	/**
	 * Path to the config file, absolute or relative to `cwd`.
	 *
	 * @default "yumma.config.mjs"
	 */
	configPath?: string;

	/**
	 * Inline configuration. When provided, no config file is read.
	 */
	config?: Config;

	/**
	 * Class names to skip, e.g. custom classes defined in your own CSS.
	 */
	allowlist?: string[];
}

export interface InvalidClass {
	className: string;
	/**
	 * Absolute paths of the files the class appears in.
	 */
	files: string[];
	/**
	 * The closest valid class, when one exists (e.g. "g-4" for "gap-4").
	 */
	suggestion?: string;
}

export interface ValidateResult {
	/**
	 * Number of source files scanned.
	 */
	files: number;

	/**
	 * Number of unique class names found.
	 */
	classes: number;

	/**
	 * Classes Yumma CSS does not recognize, sorted alphabetically.
	 */
	invalid: InvalidClass[];
}

// Only class attribute contexts are scanned - not every string in the
// file - so arbitrary hyphenated strings are not reported as classes.
const classRegexes = [
	/class(?:Name)?\s*=\s*["']([^"']+)["']/g,
	/class(?:Name)?=\{["']([^"']+)["']\}/g,
	/class(?:Name)?=\{`([^`]+)`\}/g,
	/\b(?:cn|clsx|classnames|cva)\s*\(\s*["'`]([^"'`]+)["'`]/g,
];

// Tokens that cannot be class names (code fragments, placeholders like
// "w-(value)", ellipses) are skipped rather than reported.
const classNamePattern = /^@?[a-z][a-zA-Z0-9@:/.%-]*$/;

export function extractClasses(content: string): Set<string> {
	const classes = new Set<string>();

	for (const regex of classRegexes) {
		regex.lastIndex = 0;
		let match = regex.exec(content);
		while (match !== null) {
			// Template literal expressions cannot be validated statically.
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
