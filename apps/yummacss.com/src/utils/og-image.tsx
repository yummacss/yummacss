import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { allUis } from "content-collections";
import { ImageResponse } from "next/og";
import OgImage, { type OgSpec, type OgTheme } from "@/components/og-image";
import { docs } from "@/utils/docs";
import { type Category, getReferenceData } from "@/utils/yummacss";

export const HOME_OG: Record<"css" | "ui", OgSpec> = {
  css: {
    kind: "home",
    product: "css",
    before: "Get faster at",
    word: "CSS",
    second: "while you use it.",
  },
  ui: {
    kind: "home",
    product: "ui",
    before: "Yumma",
    word: "UI",
    second: "for React",
  },
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
    product: "css",
    title: doc.title,
    description: doc.description,
    classes: pageClasses(doc.content),
  };
}

// scripts/og-components.mjs writes these at twice their size
const SHOTS = join(process.cwd(), "public/og/ui");

export async function uiOg(slug: string): Promise<OgSpec | null> {
  const ui = allUis.find((u) => u._meta.path === slug);
  if (!ui) return null;
  const file = join(SHOTS, `${slug}.png`);
  if (!existsSync(file)) {
    return {
      kind: "title",
      product: "ui",
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

  // the brand files, so the covers draw the same mark people download
  const product = spec.kind === "component" ? "ui" : spec.product;
  const svg = await readFile(
    join(
      process.cwd(),
      `public/brand/yumma${product}-mark${theme === "dark" ? "-dark" : ""}.svg`,
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
