// writes the logo files: public/brand, the favicons and src/components/icons/yumma-logo.tsx
// run with `pnpm brand`; the PNGs need the Playwright browser
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const HEADER = "written by apps/yummacss.com/scripts/brand.mjs, do not edit";

const INK = "#2B2B2B";
const PAPER = "#FFFFFF";
const NIGHT = "#000000";

// two 25 px squares with a 4 px radius, turned 75deg about their own corners, on a 48 px grid
const SQUARES = [
	{ x: 28.1481, y: 6, opacity: 0.85 },
	{ x: 36.7783, y: 10.9827, opacity: 0.95 },
];
const squares = (fill) =>
	SQUARES.map(
		({ x, y, opacity }) =>
			`<rect opacity="${opacity}" x="${x}" y="${y}" width="25" height="25" rx="4" transform="rotate(75 ${x} ${y})" fill="${fill}"/>`,
	).join("");

// the squares' outer edge, so the bare mark has no empty margin
const bounds = (() => {
	const a = (75 * Math.PI) / 180;
	const [c, s] = [Math.cos(a), Math.sin(a)];
	const box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
	for (const { x, y } of SQUARES)
		for (const [cx, cy] of [
			[4, 4],
			[21, 4],
			[4, 21],
			[21, 21],
		])
			for (let t = 0; t < 360; t += 0.25) {
				const lx = cx + 4 * Math.cos((t * Math.PI) / 180);
				const ly = cy + 4 * Math.sin((t * Math.PI) / 180);
				const px = x + lx * c - ly * s;
				const py = y + lx * s + ly * c;
				box.x0 = Math.min(box.x0, px);
				box.y0 = Math.min(box.y0, py);
				box.x1 = Math.max(box.x1, px);
				box.y1 = Math.max(box.y1, py);
			}
	const r = (n) => Math.round(n * 1000) / 1000;
	return {
		x: r(box.x0),
		y: r(box.y0),
		w: r(box.x1 - box.x0),
		h: r(box.y1 - box.y0),
	};
})();
const MARK_BOX = `${bounds.x} ${bounds.y} ${bounds.w} ${bounds.h}`;

const svg = (viewBox, body) =>
	`<!-- ${HEADER} -->\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">${body}</svg>\n`;
const bare = (ink) => svg(MARK_BOX, squares(ink));
const tile = (page, ink) =>
	svg(
		"0 0 48 48",
		`<rect width="48" height="48" rx="8" fill="${page}"/>${squares(ink)}`,
	);

// the wordmark in Outfit Medium, with the mark centered on the lowercase height
const font = opentype.parse(
	(
		await readFile(
			join(
				root,
				"node_modules/@fontsource/outfit/files/outfit-latin-500-normal.woff",
			),
		)
	).buffer,
);
const SIZE = 100;
const TRACK = -0.02 * SIZE;
const XH = -font.getPath("x", 0, 0, SIZE).getBoundingBox().y1;
const MARK_H = 1.75 * XH;
const SCALE = MARK_H / bounds.h;
const MARK_W = bounds.w * SCALE;
const GAP = 0.42 * XH;

function wordmark(word) {
	let x = MARK_W + GAP;
	let d = "";
	for (const glyph of font.stringToGlyphs(word)) {
		d += glyph.getPath(x, 0, SIZE).toPathData(2);
		x += (glyph.advanceWidth / font.unitsPerEm) * SIZE + TRACK;
	}
	const text = font.getPath(word, 0, 0, SIZE).getBoundingBox();
	const markTop = -XH / 2 - MARK_H / 2;
	const top = Math.min(markTop, text.y1);
	const bottom = Math.max(markTop + MARK_H, text.y2);
	const r = (n) => Math.round(n * 1000) / 1000;
	return {
		viewBox: `0 0 ${r(x - TRACK)} ${r(bottom - top)}`,
		mark: `translate(0 ${r(markTop - top)}) scale(${r(SCALE)}) translate(${-bounds.x} ${-bounds.y})`,
		text: `translate(0 ${r(-top)})`,
		d,
	};
}

const WORDS = { yummacss: wordmark("yummacss"), yummaui: wordmark("yummaui") };
const lockup = ({ viewBox, mark, text, d }, ink) =>
	svg(
		viewBox,
		`<g transform="${mark}">${squares(ink)}</g><path transform="${text}" d="${d}" fill="${ink}"/>`,
	);

const files = {
	"yumma-mark": bare(INK),
	"yumma-mark-dark": bare(PAPER),
	"yumma-tile": tile(PAPER, INK),
	"yumma-tile-dark": tile(NIGHT, PAPER),
	yummacss: lockup(WORDS.yummacss, INK),
	"yummacss-dark": lockup(WORDS.yummacss, PAPER),
	yummaui: lockup(WORDS.yummaui, INK),
	"yummaui-dark": lockup(WORDS.yummaui, PAPER),
};

await mkdir(join(root, "public/brand"), { recursive: true });
for (const [name, body] of Object.entries(files))
	await writeFile(join(root, `public/brand/${name}.svg`), body);

await writeFile(
	join(root, "public/favicon.svg"),
	svg(
		MARK_BOX,
		`<style>rect{fill:${INK}}@media (prefers-color-scheme:dark){rect{fill:${PAPER}}}</style>${squares(INK)}`,
	),
);

// the React marks paint in currentColor, so they follow the page's ink
const jsxSquares = SQUARES.map(
	({ x, y, opacity }) =>
		`<rect opacity={${opacity}} x={${x}} y={${y}} width={25} height={25} rx={4} transform="rotate(75 ${x} ${y})" />`,
).join("\n\t\t\t");
const jsxLockup = (name, { viewBox, mark, text, d }) => `
/** The ${name === "yummacss" ? "Yumma CSS" : "Yumma UI"} logo, the mark and the wordmark, in the current text color. */
export function ${name === "yummacss" ? "YummaCSSLogo" : "YummaUILogo"}(props: ComponentProps<"svg">) {
	return (
		<svg viewBox="${viewBox}" fill="currentColor" aria-hidden="true" {...props}>
			<g transform="${mark}">
			${jsxSquares}
			</g>
			<path transform="${text}" d="${d}" />
		</svg>
	);
}
`;
await writeFile(
	join(root, "src/components/icons/yumma-logo.tsx"),
	`// ${HEADER}
import type { ComponentProps } from "react";

/** Width over height of the bare mark. */
export const MARK_RATIO = ${Math.round((bounds.w / bounds.h) * 10000) / 10000};

/** The Yumma mark on its own, in the current text color. */
export function YummaMark(props: ComponentProps<"svg">) {
	return (
		<svg viewBox="${MARK_BOX}" fill="currentColor" aria-hidden="true" {...props}>
			${jsxSquares}
		</svg>
	);
}
${jsxLockup("yummacss", WORDS.yummacss)}${jsxLockup("yummaui", WORDS.yummaui)}`,
);

// PNGs, the .ico and the touch icon, drawn by the browser
// required, not imported, so the globally installed Playwright resolves too
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const page = await browser.newPage();
async function png(body, width, height, opaque = false) {
	await page.setViewportSize({ width, height });
	await page.setContent(
		`<style>html,body{margin:0}svg{display:block;width:${width}px;height:${height}px}</style>${body.replace(/<!--.*?-->\n/, "")}`,
	);
	return page.screenshot({ omitBackground: !opaque, type: "png" });
}
const sizeOf = (body, height) => {
	const [, , w, h] = body
		.match(/viewBox="([^"]+)"/)[1]
		.split(" ")
		.map(Number);
	return [Math.round((height * w) / h), height];
};
for (const [name, body] of Object.entries(files)) {
	const height = name.startsWith("yumma-") ? 512 : 256;
	await writeFile(
		join(root, `public/brand/${name}.png`),
		await png(body, ...sizeOf(body, height)),
	);
}

// iOS rounds the corners itself, so the touch icon is a full square
const touch = svg(
	"0 0 48 48",
	`<rect width="48" height="48" fill="${PAPER}"/>${squares(INK)}`,
);
await writeFile(
	join(root, "public/apple-touch-icon.png"),
	await png(touch, 180, 180, true),
);

// a .ico holding one 32 px PNG, which every browser since IE 11 reads
const ico32 = await png(files["yumma-tile"], 32, 32);
const head = Buffer.alloc(22);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6);
head.writeUInt8(32, 7);
head.writeUInt16LE(1, 10);
head.writeUInt16LE(32, 12);
head.writeUInt32LE(ico32.length, 14);
head.writeUInt32LE(22, 18);
await writeFile(join(root, "public/favicon.ico"), Buffer.concat([head, ico32]));

await browser.close();

execFileSync(
	"pnpm",
	["exec", "vp", "fmt", "src/components/icons/yumma-logo.tsx"],
	{
		cwd: root,
		stdio: "inherit",
	},
);
