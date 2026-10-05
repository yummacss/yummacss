import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
	CLASS_FUNCTIONS,
	type Config,
	loadConfig,
	suggestClasses,
	validateClasses,
} from "@yummacss/nitro";
import { glob } from "tinyglobby";

/** Options for {@link lintProject}. */
export interface LintOptions {
	/**
	 * Directory to resolve the config and the source globs from.
	 *
	 * @default process.cwd()
	 */
	cwd?: string;

	/** Path to a config file, when it is not `yumma.config.mjs` beside `cwd`. */
	configPath?: string;

	/** A config to use directly, instead of reading one from disk. */
	config?: Config;

	/**
	 * Class names to accept even though Yumma CSS does not generate them.
	 *
	 * @example ["docs-container", "brand-logo"]
	 */
	allowlist?: string[];
}

/** A class Yumma CSS does not recognize, and where it was found. */
export interface InvalidClass {
	className: string;
	files: string[];
	/** The closest class that does exist, when one is close enough. */
	suggestion?: string;
}

/** What {@link lintProject} found. */
export interface LintResult {
	/** How many files were scanned. */
	files: number;

	/** How many unique classes were found across them. */
	classes: number;

	/** Every class Yumma CSS does not generate, each with the files it appears in. */
	invalid: InvalidClass[];
}

/** Where a class list can appear in source: class attributes and the class helpers. */
export const CLASS_CONTEXTS = [
	/class(?:Name)?\s*=\s*["']([^"']+)["']/g,
	/class(?:Name)?=\{["']([^"']+)["']\}/g,
	/class(?:Name)?=\{`([^`]+)`\}/g,
	new RegExp(
		`\\b(?:${CLASS_FUNCTIONS.join("|")})\\s*\\(\\s*["'\`]([^"'\`]+)["'\`]`,
		"g",
	),
];

const classNamePattern = /^@?[a-z][a-zA-Z0-9@:/.%-]*$/;

/**
 * Reads the class names out of a source string, from the same class attribute
 * contexts {@link lintProject} scans. For building your own rules on top.
 */
export function extractClasses(content: string): Set<string> {
	const classes = new Set<string>();

	for (const regex of CLASS_CONTEXTS) {
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

/**
 * Scans a project's `source` files and reports every class Yumma CSS does not
 * generate. It reads the same tables the generator does, so variants, opacity
 * suffixes, negatives, custom colors and a configured prefix all pass.
 */
export async function lintProject(
	options: LintOptions = {},
): Promise<LintResult> {
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
