import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import OgImage, { type OgSpec, type OgTheme } from "@/components/og-image";
import { docs } from "@/utils/docs";
import { type Category, getReferenceData } from "@/utils/yummacss";

export const HOME_OG: OgSpec = {
	kind: "home",
	before: "Get faster at",
	word: "CSS",
	second: "while you use it.",
};

/** The first classes a utility page lists, read from its first Reference. */
function pageClasses(content = ""): string[] {
	const match = content.match(
		/<Reference category="([^"]+)" names?=(?:"|\{\[")([^"]+)"/,
	);
	if (!match) return [];
	const data = getReferenceData(match[1] as Category, match[2]);
	return data?.rows.slice(0, 5).map((row) => row.className) ?? [];
}

export function docsOg(slug: string): OgSpec | null {
	const doc = docs.find((d) => d._meta.path === slug);
	if (!doc) return null;
	return {
		kind: "title",
		title: doc.title,
		description: doc.description,
		classes: pageClasses(doc.content),
	};
}

export async function ogImage(spec: OgSpec | null, theme: OgTheme = "light") {
	if (!spec) return new Response("Not found", { status: 404 });

	// the brand file, so the covers draw the same mark people download
	const svg = await readFile(
		join(
			process.cwd(),
			`public/brand/yummacss-mark${theme === "dark" ? "-dark" : ""}.svg`,
		),
	);
	const mark = `data:image/svg+xml;base64,${svg.toString("base64")}`;

	const font = (file: string) =>
		readFile(join(process.cwd(), "node_modules/@fontsource", file));
	const [esteban, quattro] = await Promise.all([
		font("esteban/files/esteban-latin-400-normal.woff"),
		font("ia-writer-quattro/files/ia-writer-quattro-latin-400-normal.woff"),
	]);

	return new ImageResponse(<OgImage spec={spec} theme={theme} mark={mark} />, {
		width: 1200,
		height: 630,
		fonts: [
			{ name: "Esteban", data: esteban, weight: 400, style: "normal" },
			{ name: "Quattro", data: quattro, weight: 400, style: "normal" },
		],
	});
}
