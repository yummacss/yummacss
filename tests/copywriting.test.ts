import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

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

	it("calls the focus indicator an outline", () => {
		expect(offenders(/\brings?\b/i)).toEqual([]);
	});
});
