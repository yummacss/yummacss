import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { colorTheme, generateShades } from "@yummacss/core";
import { describe, expect, it } from "vitest";
import {
  ACCENT_CLASSES,
  ACCENT_EXCLUDES,
  ACCENTS,
  accentCss,
  accentShade,
  DEFAULT_ACCENT,
} from "../src/utils/accent";
import { rootDir } from "./helpers";

describe("preview accent", () => {
  it("emits nothing for the colour the components already ship", () => {
    expect(accentCss(DEFAULT_ACCENT)).toBe("");
  });

  it("writes selectors the generator emits", () => {
    const css = accentCss("indigo");
    expect(css).toContain(".bg\\:slate-12 {");
    expect(css).toContain(".h\\:bg\\:slate-11:hover {");
  });

  it("picks a shade that keeps white text readable", () => {
    for (const family of ACCENTS) {
      const shades = generateShades(
        colorTheme[family as keyof typeof colorTheme],
      );
      const shade = accentShade(shades);
      expect(shade).toBeGreaterThanOrEqual(6);
      expect(shade).toBeLessThan(12);
    }
    expect(accentCss("indigo")).toContain("background-color: #5558cf;");
  });

  it("covers every family Yumma ships", () => {
    expect(ACCENTS).toContain("indigo");
    expect(ACCENTS.length).toBeGreaterThan(15);

    for (const family of ACCENTS) {
      if (family === DEFAULT_ACCENT) continue;
      const css = accentCss(family);
      expect(css.split("\n")).toHaveLength(ACCENT_CLASSES.length);
      expect(css).toMatch(/#[0-9a-f]{6}/i);
      const selectors = css
        .split("\n")
        .map((rule) => rule.slice(0, rule.indexOf(" {")));
      for (const excluded of ACCENT_EXCLUDES) {
        expect(selectors).not.toContain(`.${excluded}`);
      }
    }
  });

  it("names every accent-shaped class the registry uses", () => {
    const dir = join(rootDir, "src/registry/ui");
    const known = new Set([...ACCENT_CLASSES, ...ACCENT_EXCLUDES]);
    const missed = new Set<string>();

    for (const file of readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
      const source = readFileSync(join(dir, file), "utf-8");
      for (const [cls] of source.matchAll(
        /\b(?:[a-z]{1,3}:)?[a-z]{1,4}:slate-1[12]\b/g,
      )) {
        if (!known.has(cls)) missed.add(`${file}: ${cls}`);
      }
    }

    expect([...missed].sort()).toEqual([]);
  });
});
