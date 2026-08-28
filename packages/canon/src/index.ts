import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
	type Config,
	extractClassStrings,
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

// Tokens that cannot be class names (code fragments, placeholders like
// "w-(value)", ellipses) are skipped rather than reported.
const classNamePattern = /^@?[a-z][a-zA-Z0-9@:/.%-]*$/;

/**
 * Class attributes and `cn`/`clsx`/`cva` arguments are class lists by
 * construction. An object value is read too, but only when every token in it
 * looks like a class - that is what reaches
 * `const SHAPES = { rounded: "br-lg" }`, where a prop-driven component keeps
 * most of its classes, without reporting every hyphenated string in the file.
 * A bare literal is left alone: it is prose as often as it is markup.
 */
export function extractClasses(content: string): Set<string> {
	const classes = new Set<string>();

	for (const literal of extractClassStrings(content)) {
		if (literal.context === "bare") continue;

		const tokens = literal.value.split(/\s+/).filter(Boolean);
		if (tokens.length === 0) continue;

		const declared =
			literal.context === "attribute" || literal.context === "call";
		if (
			!declared &&
			!tokens.every(
				(token) =>
					classNamePattern.test(token) &&
					(token.includes("-") || token.includes(":")),
			)
		) {
			continue;
		}

		for (const className of tokens) {
			if (classNamePattern.test(className)) classes.add(className);
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
