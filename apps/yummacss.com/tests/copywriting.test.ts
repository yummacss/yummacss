import { describe, expect, it } from "vite-plus/test";
import { contentPages } from "./helpers";

const collections = ["docs"] as const;

const allPages = collections.flatMap((collection) =>
	contentPages(collection).map(({ slug, source }) => ({
		page: `${collection}/${slug}.mdx`,
		source,
	})),
);

function prose(source: string): string[] {
	const withoutFrontmatter = source.replace(/^---\n[\s\S]*?\n---/, (block) =>
		block.replace(/[^\n]/g, ""),
	);

	let inFence = false;

	return withoutFrontmatter.split("\n").map((line) => {
		if (/^\s*```/.test(line)) {
			inFence = !inFence;
			return "";
		}

		if (inFence) return "";
		if (/^\s*\|/.test(line)) return "";

		return line.replace(/<[^>]*>/g, " ");
	});
}

function findAll(
	pages: { page: string; source: string }[],
	pattern: RegExp,
): string[] {
	const hits: string[] = [];

	for (const { page, source } of pages) {
		prose(source).forEach((line, index) => {
			const match = line.match(pattern);
			if (match) hits.push(`${page}:${index + 1}  ${match[0].trim()}`);
		});
	}

	return hits;
}

describe("copywriting", () => {
	it("uses no em dashes", () => {
		expect(findAll(allPages, /.{0,30}—.{0,30}/)).toEqual([]);
	});

	it("uses no spaced hyphen as a dash", () => {
		expect(findAll(allPages, /\w\s+-\s+(?!>)\w.{0,20}/)).toEqual([]);
	});

	it("spells `cannot` as one word", () => {
		expect(findAll(allPages, /\bcan not\b/)).toEqual([]);
	});

	it("uses US spelling", () => {
		expect(
			findAll(
				allPages,
				/\b\w*(?:behaviour|colour|recognis|normalis|centre)\w*/i,
			),
		).toEqual([]);
	});

	it("never mentions Tailwind", () => {
		expect(findAll(allPages, /\btailwind\b/i)).toEqual([]);
	});

	it("uses no first person", () => {
		expect(findAll(allPages, /\b(?:we|we're|our|ours)\b/i)).toEqual([]);
	});

	it("leaves no trailing whitespace", () => {
		const dirty: string[] = [];

		for (const { page, source } of allPages) {
			source.split("\n").forEach((line, index) => {
				if (/[ \t]+$/.test(line)) dirty.push(`${page}:${index + 1}`);
			});
		}

		expect(dirty).toEqual([]);
	});

	// page titles stay Title Case; a heading capitalizes its first word, page
	// titles, the word before "utilities", names & acronyms
	it("writes headings in sentence case", () => {
		const names = new Set(
			"Yumma Vite Next.js Oxlint ESLint Claude Code Solar React PostCSS Turbopack Webpack Graphite Tactile Base Linux Windows PowerShell".split(
				" ",
			),
		);
		const titles = allPages
			.map(({ source }) => source.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1])
			.filter((title): title is string => Boolean(title))
			.sort((a, b) => b.length - a.length);

		const wrong: string[] = [];

		for (const { page, source } of allPages) {
			source.split("\n").forEach((line, index) => {
				const text =
					line.match(/^#{1,6}\s+(.*)$/)?.[1] ??
					line.match(/^\s*<Step title="([^"]*)"/)?.[1] ??
					line.match(/^:::\w+\[([^\]]*)\]/)?.[1];
				if (!text) return;

				let rest = text.replace(/`[^`]*`/g, "~");
				for (const title of titles) rest = rest.split(title).join("~");

				const words = rest.split(/\s+/);
				words.forEach((word, position) => {
					if (position === 0 || !/^[A-Z]/.test(word)) return;
					const bare = word.replace(/[,:?!()]|\.$/g, "");
					if (names.has(bare) || /^[A-Z0-9]{2,}s?$/.test(bare)) return;
					if (/^.+[A-Z]/.test(bare) && !bare.includes("-")) return;
					if (/^utilit/i.test(words[position + 1] ?? "")) return;
					wrong.push(`${page}:${index + 1}  ${text}  ->  "${word}"`);
				});
			});
		}

		expect(wrong).toEqual([]);
	});

	// the description leads a page, so the body opens with a heading, a table or a hint
	it("opens every page with a heading, not a paragraph", () => {
		const bad = allPages.filter(({ source }) => {
			const body = source
				.replace(/^---\n[\s\S]*?\n---/, "")
				.replace(/```[\s\S]*?```/g, "")
				.replace(/<([A-Z]\w*)\b[\s\S]*?<\/\1>/g, "")
				.replace(/:::[\s\S]*?:::/g, "")
				.replace(/^(import|export) .*$/gm, "");
			const lead = body.split(/^#{2,} /m)[0] ?? "";
			return lead
				.split(/\n\s*\n/)
				.some((block) => /^[A-Za-z`*[>]/.test(block.trim()));
		});
		expect(bad.map(({ page }) => page)).toEqual([]);
	});

	it("keeps every paragraph under 30 words", () => {
		const long: string[] = [];
		for (const { page, source } of allPages) {
			for (const block of prose(source)
				.join("\n")
				.split(/\n\s*\n/)) {
				const text = block.trim();
				if (!text || /^(#|-|\d+\.|:::|import |export )/.test(text)) continue;
				const words = text.split(/\s+/).length;
				if (words > 30)
					long.push(`${page}  ${words} words: ${text.slice(0, 60)}`);
			}
		}
		expect(long).toEqual([]);
	});

	it("gives every page a one-sentence description", () => {
		const bad: string[] = [];

		for (const { page, source } of allPages) {
			const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1];
			const raw = frontmatter?.match(/^description:\s*(.+)$/m)?.[1];

			if (!raw) {
				bad.push(`${page}  missing description`);
				continue;
			}

			const text = raw.trim().replace(/^["']|["']$/g, "");

			if (!/[.!?]$/.test(text)) bad.push(`${page}  unpunctuated: ${text}`);
			if (text.length > 120) bad.push(`${page}  ${text.length} chars: ${text}`);
		}

		expect(bad).toEqual([]);
	});
});
