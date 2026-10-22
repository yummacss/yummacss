import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";
import {
  applyStyle,
  nearestRadius,
  RADIUS,
  radiusCss,
  refusal,
  STYLES,
  styleFlags,
  styleProps,
} from "../src/utils/styles.mjs";
import { rootDir } from "./helpers";

const registryDir = join(rootDir, "src/registry/ui");
const files = readdirSync(registryDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => ({
    file,
    source: readFileSync(join(registryDir, file), "utf8"),
  }));

type Style = keyof typeof STYLES;
const styles = Object.keys(STYLES) as Style[];

function tables(source: string): string[] {
  return [
    ...source.matchAll(/^const [A-Z_]*SHAPES\b[^=]*= \{\n([\s\S]*?)^\};/gm),
  ].map((match) => match[1]);
}

function union(source: string, type: string): string[] {
  const found = source.match(new RegExp(`^type ${type} = ([^;]+);`, "m"));
  return found ? [...found[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];
}

describe("styles", () => {
  it("leaves every file as it is under Soft at Large", () => {
    for (const { file, source } of files) {
      expect(applyStyle(source, "soft", "large"), file).toBe(source);
    }
  });

  it("refuses each blocked pair with its reason", () => {
    for (const style of styles) {
      for (const radius of RADIUS) {
        const allowed = STYLES[style].allow.includes(radius);
        expect(refusal(style, radius) === null, `${style} ${radius}`).toBe(
          allowed,
        );
        if (!allowed) expect(() => applyStyle("", style, radius)).toThrow();
      }
      expect(STYLES[style].allow).toContain(STYLES[style].radius);
    }
  });

  it("writes valid classes and defaults for every allowed pair", async () => {
    const problems: string[] = [];
    for (const { file, source } of files) {
      for (const style of styles) {
        for (const radius of STYLES[style].allow) {
          const out = applyStyle(source, style, radius);
          const classes = tables(out).flatMap((body) =>
            [...body.matchAll(/"([^"]*)"/g)].flatMap((m) =>
              m[1].split(/\s+/).filter(Boolean),
            ),
          );
          const { invalid } = await validateClasses([...new Set(classes)], {});
          for (const cls of invalid)
            problems.push(`${file} ${style}/${radius}: ${cls}`);
          for (const [, prop, value] of out.matchAll(
            /^\s+(shape|iconShape|size) = "([^"]+)",$/gm,
          )) {
            const type = prop === "size" ? "Size" : "Shape";
            if (!union(out, type).includes(value)) {
              problems.push(`${file} ${style}/${radius}: ${prop} = "${value}"`);
            }
          }
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it("never moves a capsule", () => {
    for (const { file, source } of files) {
      const before = (source.match(/br:9999/g) ?? []).length;
      for (const style of styles) {
        for (const radius of STYLES[style].allow) {
          const after = (
            applyStyle(source, style, radius).match(/br:9999/g) ?? []
          ).length;
          expect(after, `${file} ${style}/${radius}`).toBe(before);
        }
      }
    }
  });

  it("keeps rounded and squircle apart in every table", () => {
    const same: string[] = [];
    for (const { file, source } of files) {
      for (const body of tables(source)) {
        const rounded = body.match(/^\s*rounded: "([^"]*)",$/m)?.[1];
        const squircle = body.match(/^\s*squircle: "([^"]*)",$/m)?.[1];
        if (rounded && rounded === squircle) same.push(file);
      }
    }
    expect(same).toEqual([]);
  });

  it("rewrites the parts it names", () => {
    const read = (id: string) =>
      readFileSync(join(registryDir, `${id}.tsx`), "utf8");
    const button = applyStyle(read("button"), "compact", "small");
    expect(button).toMatch(/^\s*rounded: "br:sm",$/m);
    expect(button).toMatch(/^\s*size = "sm",$/m);
    expect(applyStyle(read("checkbox"), "compact", "small")).toMatch(
      /^\s*rounded: "br:xs",$/m,
    );
    expect(applyStyle(read("button"), "compact", "none")).toMatch(
      /^\s*shape = "square",$/m,
    );
    expect(applyStyle(read("dialog"), "squircle", "large")).toMatch(
      /^\s*shape = "squircle",$/m,
    );
    expect(applyStyle(read("dialog"), "soft", "extra")).not.toBe(
      read("dialog"),
    );
  });

  it("keeps a container rounder than what it holds", () => {
    const scale = ["0", "xs", "sm", "md", "lg", "xl", "xxl", "3xl"];
    const nested = [
      ["tabs", "LIST_SHAPES", "TAB_SHAPES"],
      ["menubar", "BAR_SHAPES", "TRIGGER_SHAPES"],
      ["menubar", "POPUP_SHAPES", "ITEM_SHAPES"],
      ["menu", "POPUP_SHAPES", "ITEM_SHAPES"],
      ["context-menu", "POPUP_SHAPES", "ITEM_SHAPES"],
      ["toolbar", "ROOT_SHAPES", "CONTROL_SHAPES"],
    ];
    const step = (source: string, table: string, key: string) => {
      const body =
        source.match(
          new RegExp(`^const ${table}\\b[^=]*= \\{\\n([\\s\\S]*?)^\\};`, "m"),
        )?.[1] ?? "";
      const value = body.match(
        new RegExp(`^\\s*${key}: "br:([a-z0-9]+)`, "m"),
      )?.[1];
      return value ? scale.indexOf(value) : -1;
    };
    const flat: string[] = [];
    for (const [id, outer, inner] of nested) {
      const source = readFileSync(join(registryDir, `${id}.tsx`), "utf8");
      for (const style of styles) {
        for (const radius of STYLES[style].allow) {
          const out = applyStyle(source, style, radius);
          for (const key of ["rounded", "squircle"]) {
            const o = step(out, outer, key);
            const i = step(out, inner, key);
            expect(o, `${id} ${outer}.${key}`).toBeGreaterThan(-1);
            if (o <= i)
              flat.push(
                `${id} ${style}/${radius} ${key}: ${outer} ${scale[o]} <= ${inner} ${scale[i]}`,
              );
          }
        }
      }
    }
    expect(flat).toEqual([]);
  });

  it("falls back to the nearest allowed radius", () => {
    expect(nearestRadius("squircle", "none")).toBe("medium");
    expect(nearestRadius("squircle", "extra")).toBe("large");
    expect(nearestRadius("soft", "none")).toBe("small");
    expect(nearestRadius("compact", "medium")).toBe("medium");
  });

  it("names the defaults a style writes, for the props a component has", () => {
    const read = (id: string) =>
      JSON.parse(
        readFileSync(join(rootDir, "src/registry/meta", `${id}.json`), "utf8"),
      ).props;
    expect(styleProps(read("button"), "compact", "small")).toEqual({
      shape: "rounded",
      size: "sm",
    });
    expect(styleProps(read("button"), "squircle", "large")).toEqual({
      shape: "squircle",
    });
    expect(styleProps(read("button"), "compact", "none")).toEqual({
      shape: "square",
      size: "sm",
    });
    expect(styleProps(read("radio"), "squircle", "large")).toEqual({});
  });

  it("writes only the flags a pair needs", () => {
    expect(styleFlags("soft", "large")).toBe("");
    expect(styleFlags("soft", "small")).toBe("--radius small");
    expect(styleFlags("compact", "small")).toBe("--style compact");
    expect(styleFlags("squircle", "medium")).toBe(
      "--style squircle --radius medium",
    );
  });

  it("previews exactly what applyStyle writes", () => {
    const token = /\bbr:([a-z0-9]+)\b/g;
    const pieces =
      /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g;
    const classes = (source: string) =>
      [...source.matchAll(pieces)]
        .map((m) => m[0])
        .filter((piece) => !piece.startsWith("/"))
        .flatMap((piece) =>
          [...piece.matchAll(token)].map((m) => ({
            value: m[1],
            squircle: /\bcs:s\b/.test(piece),
          })),
        );
    const wrong: string[] = [];
    for (const { file, source } of files) {
      const before = classes(source);
      for (const style of styles) {
        for (const radius of STYLES[style].allow) {
          const css = radiusCss(style, radius);
          const after = classes(applyStyle(source, style, radius));
          before.forEach(({ value, squircle }, i) => {
            const rule = css.match(
              new RegExp(
                `\\.br\\\\:${value}${squircle ? "\\.cs" : ":not\\(\\.cs"}[^{]*\\{ border-radius: ([^;]+);`,
              ),
            );
            const shown = rule ? rule[1] : value;
            const written = after[i].value;
            if (rule ? REM[written] !== shown : written !== value) {
              wrong.push(
                `${file} ${style}/${radius}: br:${value} previews ${shown}, writes br:${written}`,
              );
            }
          });
        }
      }
    }
    expect(wrong).toEqual([]);
  });
});

const REM: Record<string, string> = {
  0: "0",
  xs: ".125rem",
  sm: ".25rem",
  md: ".375rem",
  lg: ".5rem",
  xl: ".75rem",
  xxl: "1rem",
  "3xl": "1.5rem",
};
