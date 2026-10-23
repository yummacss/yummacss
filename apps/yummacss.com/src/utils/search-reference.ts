import { generateId } from "./doc-properties";

/** A flag, an option or a config key, found on a page at build time. */
export type ReferenceEntry = {
	title: string;
	description: string;
	anchor: string;
};

// tables whose first column names something you type: a flag, an option, a field
const NAMED_BY = new Set(["flag", "option", "field"]);

const cells = (row: string) =>
	row
		.trim()
		.replace(/^\||\|$/g, "")
		.split("|")
		.map((cell) => cell.trim());

const plain = (text: string) => text.replace(/`/g, "").trim();

const heading = (line: string) => /^(#{2,4})\s+(.+?)\s*$/.exec(line);

// what a row belongs to, read from its section's code: a titled block names the
// file ("yummaui.json"), a shell block the command ("yummaui add")
function contextOf(open: string, body: string[]): string | undefined {
	const title = /title="([^"]+)"/.exec(open);
	if (title) return title[1];
	for (const line of body) {
		const run = /(?:dlx|npx|bunx)\s+(\S+)(?:\s+([a-z][\w-]*))?/.exec(line);
		if (run) return run[2] ? `${run[1]} ${run[2]}` : run[1];
	}
	return undefined;
}

export function extractReference(content: string): ReferenceEntry[] {
	const out: ReferenceEntry[] = [];
	let anchor = "";
	let columns: string[] | null = null;
	let fence: { open: string; body: string[] } | null = null;
	let section: { rows: ReferenceEntry[]; context?: string } = { rows: [] };

	const close = () => {
		for (const row of section.rows) {
			out.push(
				section.context
					? { ...row, description: `${row.description} · ${section.context}` }
					: row,
			);
		}
		section = { rows: [] };
	};

	for (const line of content.split("\n")) {
		if (line.trimStart().startsWith("```")) {
			if (fence) {
				section.context ??= contextOf(fence.open, fence.body);
				fence = null;
			} else {
				fence = { open: line, body: [] };
			}
			continue;
		}
		if (fence) {
			fence.body.push(line);
			continue;
		}

		const h = heading(line);
		if (h) {
			close();
			anchor = generateId(plain(h[2]));
		}

		if (!line.trimStart().startsWith("|")) {
			columns = null;
			continue;
		}
		if (!columns) {
			columns = cells(line).map((cell) => cell.toLowerCase());
			continue;
		}
		if (/^\|[\s|:-]+\|?$/.test(line.trim())) continue;
		if (!NAMED_BY.has(columns[0])) continue;

		const row = cells(line);
		if (!row[0].startsWith("`")) continue;
		const description = plain(
			[...row].reverse().find((cell, i) => cell && i < row.length - 1) ?? "",
		).replace(/\.$/, "");
		section.rows.push({ title: plain(row[0]), description, anchor });
	}
	close();

	return out;
}

/**
 * `yumma.config.mjs` keys, from the headings under Set Up on the configuration
 * page: `### Source` is `source`, and a `####` under `### Theme` is `theme.*`.
 */
export function extractConfigKeys(content: string): ReferenceEntry[] {
	const out: ReferenceEntry[] = [];
	let section = "";
	let parent = "";
	let fence = false;

	for (const line of content.split("\n")) {
		if (line.trimStart().startsWith("```")) fence = !fence;
		if (fence) continue;

		const h = heading(line);
		if (!h) continue;
		const [, hashes, text] = h;
		const name = plain(text);

		if (hashes === "##") {
			section = name;
			continue;
		}
		if (section !== "Setting up a project") continue;

		const key = name.toLowerCase().replace(/\s+/g, "");
		if (hashes === "###") parent = key;
		out.push({
			// a `####` heading already names its parent, as in `theme.colors`
			title: hashes === "####" && !key.includes(".") ? `${parent}.${key}` : key,
			description: "yumma.config.mjs",
			anchor: generateId(name),
		});
	}

	return out;
}
