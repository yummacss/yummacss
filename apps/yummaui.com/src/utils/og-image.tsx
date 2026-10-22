import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { allUis } from "content-collections";
import { ImageResponse } from "next/og";
import OgImage, { type OgSpec, type OgTheme } from "@/components/og-image";

export const HOME_OG: OgSpec = {
  kind: "home",
  before: "Yumma",
  word: "UI",
  second: "for React",
};

// scripts/og-components.mjs writes these at twice their size
const SHOTS = join(process.cwd(), "public/og/ui");

export async function uiOg(slug: string): Promise<OgSpec | null> {
  const ui = allUis.find((u) => u._meta.path === slug);
  if (!ui) return null;
  const file = join(SHOTS, `${slug}.png`);
  if (!existsSync(file)) {
    return {
      kind: "title",
      title: ui.title,
      description: ui.description,
    };
  }
  const png = await readFile(file);
  return {
    kind: "component",
    title: ui.title,
    description: ui.description,
    image: `data:image/png;base64,${png.toString("base64")}`,
    width: png.readUInt32BE(16) / 2,
    height: png.readUInt32BE(20) / 2,
  };
}

export async function ogImage(spec: OgSpec | null, theme: OgTheme = "light") {
  if (!spec) return new Response("Not found", { status: 404 });

  // the brand file, so the covers draw the same mark people download
  const svg = await readFile(
    join(
      process.cwd(),
      `public/brand/yummaui-mark${theme === "dark" ? "-dark" : ""}.svg`,
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
