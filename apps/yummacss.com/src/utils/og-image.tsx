import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import decompress from "wawoff2/decompress";
import OgImage, { type OgSpec, type OgTheme } from "@/components/og-image";
import { docs } from "@/utils/docs";
import { type Category, getReferenceData } from "@/utils/yummacss";

export const HOME_OG: OgSpec = {
	kind: "home",
	before: "An atomic",
	word: "CSS",
	second: "framework.",
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

	// the brand file, so the covers draw the same logo people download
	const svg = await readFile(
		join(
			process.cwd(),
			`public/brand/yummacss${theme === "dark" ? "-dark" : ""}.svg`,
		),
	);
	const mark = `data:image/svg+xml;base64,${svg.toString("base64")}`;
	const [, , w, h] = /viewBox="([^"]+)"/
		.exec(svg.toString())?.[1]
		.split(" ")
		.map(Number) ?? [0, 0, 1, 1];

	const font = (file: string) =>
		readFile(join(process.cwd(), "node_modules", file));
	// the image renderer reads no woff2, which is all Geist ships
	const [serif, quattro] = await Promise.all([
		font("geist/dist/fonts/geist-serif/GeistSerif-Square.woff2").then(
			decompress,
		),
		font(
			"@fontsource/ia-writer-quattro/files/ia-writer-quattro-latin-400-normal.woff",
		),
	]);

	return new ImageResponse(
		<OgImage spec={spec} theme={theme} mark={mark} markRatio={w / h} />,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Geist Serif",
					data: Buffer.from(serif),
					weight: 400,
					style: "normal",
				},
				{ name: "Quattro", data: quattro, weight: 400, style: "normal" },
			],
		},
	);
}
