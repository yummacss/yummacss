import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { type Config, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";
import { agentRules, EXAMPLES, SYNTAX } from "@/utils/agent-rules";
import { rootDir } from "./helpers";

const config = (await import("../yumma.config.mjs")).default as Config;

const llms = join(rootDir, "src/app/llms.txt/route.ts");

// the docs describe 4.x
const files = [
  ...["src/content/docs", "src/content/ui"].flatMap((dir) =>
    readdirSync(join(rootDir, dir), { recursive: true })
      .map(String)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => join(rootDir, dir, file)),
  ),
  llms,
];

// `h:bg-silver-2` or `d-f`: any variants, then a utility written with a dash
const DASHED =
  /(?<![\w./#-])((?:[@a-z]+::?)*)([a-z]{1,4})-(-?[a-z0-9]+(?:-[a-z0-9]+)?(?:\/\d+)?)(?![\w-])/g;

describe("Class syntax", () => {
  it("writes no class in the 3.x dash form", () => {
    const seen = new Map<string, string>();
    for (const file of files) {
      for (const [dashed, variants, prefix, value] of readFileSync(
        file,
        "utf-8",
      ).matchAll(DASHED)) {
        seen.set(
          `${variants}${prefix}:${value}`,
          `${dashed} (${relative(rootDir, file)})`,
        );
      }
    }

    // a dashed token is a 3.x class when its colon form is a real 4.x class
    const { valid } = validateClasses(seen.keys(), config);

    expect(valid.map((modern) => `${seen.get(modern)}, use ${modern}`)).toEqual(
      [],
    );
  });

  it("teaches agents only classes that exist, bar its one counterexample", () => {
    const examples = [...agentRules().matchAll(/`([^`\s]+:[^`\s]*)`/g)]
      .map(([, cls]) => cls)
      .filter((cls) => !cls.startsWith(":"))
      // a variant on its own, such as `@md:`, is checked on a utility
      .map((cls) => (cls.endsWith(":") ? `${cls}d:f` : cls));

    // the states the Yumma UI installation page has a project declare
    const { invalid } = validateClasses(examples, {
      theme: {
        states: {
          opening: "[data-starting-style]",
          closing: "[data-ending-style]",
        },
      },
    });

    expect(examples.length).toBeGreaterThan(50);
    expect(invalid).toEqual(["w:37px"]);
  });

  it("gives llms.txt and agents.md the same syntax", () => {
    expect(readFileSync(llms, "utf-8")).toContain("...SYNTAX");
    expect(agentRules()).toContain(SYNTAX.join("\n"));
  });

  it("points agents only at components that exist", () => {
    for (const { id } of EXAMPLES) {
      expect(
        readdirSync(join(rootDir, "src/content/ui")),
        `src/content/ui/${id}.mdx`,
      ).toContain(`${id}.mdx`);
    }
  });
});
