import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as core from "@yummacss/core";
import { describe, expect, it } from "vite-plus/test";
import { utilityPages } from "../src/utils/utility-pages.mjs";
import { rootDir } from "./helpers";

const CATEGORIES = {
	animation: core.animationUtils,
	background: core.backgroundUtils,
	border: core.borderUtils,
	boxModel: core.boxModelUtils,
	color: core.colorUtils,
	effect: core.effectUtils,
	flexbox: core.flexboxUtils,
	font: core.fontUtils,
	grid: core.gridUtils,
	interactivity: core.interactivityUtils,
	layout: core.layoutUtils,
	outline: core.outlineUtils,
	positioning: core.positioningUtils,
	text: core.textUtils,
	transform: core.transformUtils,
	transition: core.transitionUtils,
} as const;

function coreUtilities(): Set<string> {
	const out = new Set<string>();
	for (const [category, getter] of Object.entries(CATEGORIES)) {
		for (const name of Object.keys(getter())) out.add(`${category}:${name}`);
	}
	return out;
}

function mdxFilesIn(dir: string, out: string[] = []): string[] {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) mdxFilesIn(full, out);
		else if (entry.name.endsWith(".mdx")) out.push(full);
	}
	return out;
}

function referenced(): Set<string> {
	const out = new Set<string>();
	for (const file of mdxFilesIn(join(rootDir, "src/content"))) {
		const source = readFileSync(file, "utf-8");
		for (const match of source.matchAll(
			/<Reference\s+category="([^"]+)"\s+names?=(?:"([^"]+)"|\{\[([^\]]+)\]\})/g,
		)) {
			const names = match[2]
				? [match[2]]
				: [...(match[3] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);
			for (const name of names) out.add(`${match[1]}:${name}`);
		}
	}
	for (const page of utilityPages) {
		for (const name of page.tables.flat()) out.add(`${page.category}:${name}`);
	}
	return out;
}

describe("Reference coverage", () => {
	const inCore = coreUtilities();
	const onPages = referenced();

	it("lists every utility core generates", () => {
		const missing = [...inCore].filter((u) => !onPages.has(u)).sort();
		expect(missing).toEqual([]);
	});

	it("names only utilities that exist, so no section renders empty", () => {
		const unknown = [...onPages].filter((u) => !inCore.has(u)).sort();
		expect(unknown).toEqual([]);
	});
});
