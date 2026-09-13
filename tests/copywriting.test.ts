import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * The same prose rules the docs site holds, over the only copy this repo has:
 * the strings the CLI prints and the intellisense packages show in an editor.
 * Written out here rather than imported, because each repo owns its own copy.
 *
 * The docs site also spells an ellipsis as one character. That rule is not
 * here: `...` is the conventional spelling in terminal output, and a lone `…`
 * can render as a box on a legacy Windows code page.
 */

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

function sources(dir: string): string[] {
	const out: string[] = [];

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.name === "node_modules" || entry.name === "dist") continue;
		if (entry.isDirectory()) out.push(...sources(full));
		else if (entry.name.endsWith(".ts") && !entry.name.includes(".test."))
			out.push(full);
	}

	return out;
}

/** Quoted strings that read as prose: a space, lowercase letters, no code. */
function copy(): { file: string; text: string }[] {
	const out: { file: string; text: string }[] = [];
	const packages = join(rootDir, "packages");

	for (const name of readdirSync(packages)) {
		const src = join(packages, name, "src");
		let files: string[];
		try {
			files = sources(src);
		} catch {
			continue;
		}

		for (const path of files) {
			const source = readFileSync(path, "utf8");
			const file = relative(rootDir, path);

			for (const match of source.matchAll(/"([^"\n]{6,})"|'([^'\n]{6,})'/g)) {
				const text = (match[1] ?? match[2] ?? "").trim();
				if (!/[a-z]{3}/.test(text) || !text.includes(" ")) continue;
				if (/^[\w\-./@:*\s]+$/.test(text) && !/[A-Z]/.test(text)) continue;
				if (text.includes("${") || text.includes("||") || text.includes("==="))
					continue;
				out.push({ file, text });
			}
		}
	}

	return out;
}

const strings = copy();

function offenders(pattern: RegExp): string[] {
	return strings
		.filter(({ text }) => pattern.test(text))
		.map(({ file, text }) => `${file}: ${text}`);
}

describe("package copy", () => {
	it("has copy to check", () => {
		expect(strings.length).toBeGreaterThan(20);
	});

	it("uses no em dashes", () => {
		expect(offenders(/—/)).toEqual([]);
	});

	it("uses no contractions", () => {
		expect(offenders(/\b\w+(?:n't|'re|'ll|'ve|'d)\b|\bit's\b/i)).toEqual([]);
	});

	it("spells `cannot` as one word", () => {
		expect(offenders(/\bcan not\b/)).toEqual([]);
	});

	it("uses US spelling", () => {
		expect(
			offenders(/\b\w*(?:behaviour|colour|recognis|normalis|centre)\w*/i),
		).toEqual([]);
	});

	it("never mentions Tailwind", () => {
		expect(offenders(/\btailwind\b/i)).toEqual([]);
	});

	// A ring is a box-shadow standing in for an outline. Yumma has `os-`, `ow-`,
	// `oo-` and `oc-`, so the word for what focus draws is outline.
	it("calls the focus indicator an outline", () => {
		expect(offenders(/\brings?\b/i)).toEqual([]);
	});
});
