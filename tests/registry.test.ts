import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { type Config, validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";
import { EXAMPLE_ICON_STYLE } from "../src/utils/icon-style";
import { SHARED_PROP_ORDER } from "../src/utils/props";
import { rootDir } from "./helpers";

const registryDir = join(rootDir, "src/registry/ui");
const indexPath = join(rootDir, "src/registry/index.ts");

function componentFiles(): string[] {
  return readdirSync(registryDir)
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
    .map((file) => file.replace(/\.tsx?$/, ""))
    .sort();
}

function enclosingStatement(source: string, at: number): string {
  let start = 0;
  for (let i = at; i >= 0; i--) {
    const boundary =
      ";{}".includes(source[i]) &&
      !(source[i] === "{" && source[i - 1] === "$");
    if (boundary) {
      start = i + 1;
      break;
    }
  }

  const semicolon = source.indexOf(";", at);
  const end = semicolon === -1 ? source.length : semicolon;

  return source
    .slice(start, end)
    .replace(/^\s*\/\/.*$/gm, "")
    .trim()
    .replace(/\s+/g, " ");
}

function mappedIds(): string[] {
  const source = readFileSync(indexPath, "utf-8");
  return [...source.matchAll(/^\s*"([^"]+)":\s*\(\)\s*=>\s*import\(/gm)].map(
    (match) => match[1],
  );
}

describe("Yumma UI registry", () => {
  it("maps every component file", () => {
    const missing = componentFiles().filter(
      (id) => !new Set(mappedIds()).has(id),
    );

    expect(
      missing,
      "run `node scripts/generate-registry.mjs` to pick these up",
    ).toEqual([]);
  });

  it("does not map components that no longer exist", () => {
    const files = new Set(componentFiles());
    const stale = mappedIds().filter((id) => !files.has(id));

    expect(
      stale,
      "run `node scripts/generate-registry.mjs` to drop these",
    ).toEqual([]);
  });

  it("has no duplicate ids", () => {
    const ids = mappedIds();
    const seen = new Set<string>();
    const duplicates = ids.filter((id) => !seen.add(id));

    expect(duplicates).toEqual([]);
  });

  it("points every id at its own file", () => {
    const source = readFileSync(indexPath, "utf-8");
    const mismatched = [
      ...source.matchAll(
        /^\s*"([^"]+)":\s*\(\)\s*=>\s*import\("\.\/ui\/([^"]+)"\)/gm,
      ),
    ]
      .filter(([, id, target]) => id !== target)
      .map(([, id, target]) => `${id} -> ${target}`);

    expect(mismatched).toEqual([]);
  });

  it("uses one name per concept across components", () => {
    const names = new Set<string>();
    for (const file of readdirSync(join(rootDir, "src/registry/meta"))) {
      const meta = JSON.parse(
        readFileSync(join(rootDir, "src/registry/meta", file), "utf-8"),
      );
      for (const prop of meta.props ?? []) names.add(prop.name);
    }

    const byStem = new Map<string, string[]>();
    for (const name of names) {
      const stem = name.replace(/(Side|Position|Placement|Align)$/, "");
      if (stem === name) continue;
      byStem.set(stem, [...(byStem.get(stem) ?? []), name]);
    }

    const split = [...byStem.values()].filter((group) => group.length > 1);

    expect(split).toEqual([]);
  });

  it("points every conflict rule at a prop that exists", () => {
    const broken: string[] = [];

    for (const file of readdirSync(join(rootDir, "src/registry/meta"))) {
      const meta = JSON.parse(
        readFileSync(join(rootDir, "src/registry/meta", file), "utf-8"),
      );
      const names = new Set(
        (meta.props ?? []).map((p: { name: string }) => p.name),
      );
      for (const prop of meta.props ?? []) {
        for (const rule of prop.conflictsWith ?? []) {
          if (!names.has(rule.prop)) {
            broken.push(`${file}: ${prop.name} -> ${rule.prop}`);
          }
          const forms = ["is", "not", "set"].filter((key) => key in rule);
          if (forms.length !== 1) {
            broken.push(`${file}: ${prop.name} -> ${forms.length} forms`);
          }
        }
      }
    }

    expect(broken).toEqual([]);
  });

  it("gives one name one meaning across components", () => {
    const GENERIC = new Set([
      "value",
      "defaultValue",
      "onValueChange",
      "items",
      "options",
      "label",
      "description",
      "size",
      "icon",
    ]);

    const kinds = new Map<string, Set<string>>();
    for (const file of readdirSync(join(rootDir, "src/registry/meta"))) {
      const meta = JSON.parse(
        readFileSync(join(rootDir, "src/registry/meta", file), "utf-8"),
      );
      for (const prop of meta.props ?? []) {
        if (GENERIC.has(prop.name)) continue;
        kinds.set(
          prop.name,
          (kinds.get(prop.name) ?? new Set<string>()).add(prop.type),
        );
      }
    }

    const split = [...kinds]
      .filter(([, types]) => types.size > 1)
      .map(([name, types]) => `${name}: ${[...types].sort().join(" | ")}`);

    expect(split).toEqual([]);
  });

  it("declares boolean defaults as booleans", () => {
    const wrong: string[] = [];

    for (const file of readdirSync(join(rootDir, "src/registry/meta"))) {
      const meta = JSON.parse(
        readFileSync(join(rootDir, "src/registry/meta", file), "utf-8"),
      );
      for (const prop of meta.props ?? []) {
        if (prop.type === "boolean" && typeof prop.default === "string") {
          wrong.push(`${file}: ${prop.name}`);
        }
      }
    }

    expect(wrong).toEqual([]);
  });

  it("resolves every icon a schema names", () => {
    const known = new Set(Object.keys(EXAMPLE_ICON_STYLE));

    expect(known.size).toBeGreaterThan(0);

    const named: string[] = [];
    const walk = (value: unknown) => {
      if (Array.isArray(value)) return value.forEach(walk);
      if (typeof value !== "object" || value === null) return;
      const marker = (value as Record<string, unknown>).$icon;
      if (typeof marker === "string") named.push(marker);
      for (const nested of Object.values(value)) walk(nested);
    };

    const missing: string[] = [];
    for (const file of readdirSync(join(rootDir, "src/registry/meta"))) {
      const meta = JSON.parse(
        readFileSync(join(rootDir, "src/registry/meta", file), "utf-8"),
      );
      named.length = 0;
      walk(meta);
      for (const prop of meta.props ?? []) {
        if (prop.exampleIcon) named.push(prop.exampleIcon);
      }
      for (const name of named) {
        if (!known.has(name)) missing.push(`${file}: ${name}`);
      }
    }

    expect(missing).toEqual([]);
  });

  it("gives every component an Example", () => {
    const missing = readdirSync(join(rootDir, "src/registry/meta")).filter(
      (file) =>
        !JSON.parse(
          readFileSync(join(rootDir, "src/registry/meta", file), "utf-8"),
        ).scene?.length,
    );
    expect(missing).toEqual([]);
  });

  it("names only registry components in a scene", () => {
    const missing: string[] = [];
    for (const file of readdirSync(join(rootDir, "src/registry/meta"))) {
      const meta = JSON.parse(
        readFileSync(join(rootDir, "src/registry/meta", file), "utf-8"),
      );
      const walk = (nodes: { component?: string; children?: unknown }[]) => {
        for (const child of nodes) {
          const id = child.component
            ?.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .toLowerCase();
          if (id && !existsSync(join(rootDir, "src/registry/ui", `${id}.tsx`)))
            missing.push(`${file}: ${child.component}`);
          if (Array.isArray(child.children)) walk(child.children);
        }
      };
      walk(meta.scene ?? []);
    }

    expect(missing).toEqual([]);
  });

  it("leaves a kept-mounted popup's display to Base UI's hidden", () => {
    // a display class beats `hidden`, so a closed popup would stay on screen, inert
    const wrong: string[] = [];
    for (const file of readdirSync(registryDir)) {
      const source = readFileSync(join(registryDir, file), "utf8");
      if (!source.includes("keepMounted")) continue;
      // up to the line that closes the opening tag, past any `=>` inside it
      for (const tag of source.matchAll(
        /<\w+\.Popup\b(?:[^\n]*>$|[\s\S]*?\n\s*>$)/gm,
      )) {
        if (/(^|[\s"`])d:(f|g|b|if|ib|ig)\b/.test(tag[0])) wrong.push(file);
      }
    }
    expect(wrong).toEqual([]);
  });

  it("keeps one meaning per shape name", () => {
    const wrong: string[] = [];
    const uiDir = join(rootDir, "src/registry/ui");

    for (const file of readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))) {
      const source = readFileSync(join(uiDir, file), "utf-8");

      for (const [, name, body] of source.matchAll(
        /const (\w*SHAPES?\w*): Record<[^>]+> = \{([\s\S]*?)\n\};/g,
      )) {
        const entries = new Map(
          [...body.matchAll(/(\w+):\s*"([^"]*)"/g)].map((m) => [m[1], m[2]]),
        );

        const squircle = entries.get("squircle");
        if (squircle !== undefined && !squircle.includes("cs:s")) {
          wrong.push(`${file}:${name} squircle is not a squircle`);
        }

        const pill = entries.get("pill");
        const rounded = entries.get("rounded");
        if (pill !== undefined && rounded !== undefined && pill === rounded) {
          wrong.push(`${file}:${name} pill and rounded are the same`);
        }
        if (pill !== undefined && !pill.includes("br:9999")) {
          wrong.push(`${file}:${name} pill is not fully round`);
        }
      }
    }

    expect(wrong).toEqual([]);
  });

  it("keeps example objects to the fields their type declares", () => {
    const wrong: string[] = [];
    const metaDir = join(rootDir, "src/registry/meta");
    const uiDir = join(rootDir, "src/registry/ui");

    for (const file of readdirSync(metaDir).filter((f) =>
      f.endsWith(".json"),
    )) {
      const id = file.replace(/\.json$/, "");
      const component = join(uiDir, `${id}.tsx`);
      if (!existsSync(component)) continue;

      const source = readFileSync(component, "utf-8");
      const meta = JSON.parse(readFileSync(join(metaDir, file), "utf-8"));

      for (const prop of meta.props ?? []) {
        const named = /^(\w+)\[\]$/.exec(prop.typeName ?? "");
        if (!named || !Array.isArray(prop.example)) continue;

        const declared = new RegExp(
          `export interface ${named[1]}\\s*\\{([\\s\\S]*?)\\n\\}`,
        ).exec(source);
        if (!declared) continue;

        const fields = new Set(
          [...declared[1].matchAll(/^\s{2}(\w+)\??:/gm)].map((m) => m[1]),
        );

        for (const entry of prop.example) {
          if (typeof entry !== "object" || entry === null) continue;
          for (const key of Object.keys(entry)) {
            if (!fields.has(key)) {
              wrong.push(`${id}:${prop.name} has ${key}, ${named[1]} does not`);
            }
          }
        }
      }
    }

    expect(wrong).toEqual([]);
  });

  it("gives the radio no shape prop", () => {
    const meta = JSON.parse(
      readFileSync(join(rootDir, "src/registry/meta/radio.json"), "utf-8"),
    );
    const source = readFileSync(
      join(rootDir, "src/registry/ui/radio.tsx"),
      "utf-8",
    );

    expect(meta.props.map((prop: { name: string }) => prop.name)).not.toContain(
      "shape",
    );
    expect(source).not.toMatch(/shape\s*[?:=]|SHAPES|\bShape\b/);
  });

  it("gives an optional string an example and a guard to read it", () => {
    const wrong: string[] = [];
    const metaDir = join(rootDir, "src/registry/meta");
    const uiDir = join(rootDir, "src/registry/ui");

    for (const file of readdirSync(metaDir).filter((f) =>
      f.endsWith(".json"),
    )) {
      const id = file.replace(/\.json$/, "");
      const meta = JSON.parse(readFileSync(join(metaDir, file), "utf-8"));

      for (const prop of meta.props ?? []) {
        if (!prop.optional) continue;

        if (typeof prop.example !== "string" || prop.example === "") {
          wrong.push(`${id}:${prop.name} has no example to switch back on`);
        }

        const source = readFileSync(join(uiDir, `${id}.tsx`), "utf-8");
        const guard = new RegExp(`\\{\\s*${prop.name}\\s*&&`);
        if (!guard.test(source)) {
          wrong.push(`${id}:${prop.name} is rendered either way`);
        }
      }
    }

    expect(wrong).toEqual([]);
  });

  it("keeps an icon-only button off the type scale", () => {
    const source = readFileSync(
      join(rootDir, "src/registry/ui/button.tsx"),
      "utf-8",
    );

    const iconOnly = /const ICON_ONLY[^=]*=\s*\{([\s\S]*?)\n\};/.exec(source);
    expect(iconOnly).not.toBeNull();

    const classes = [...(iconOnly?.[1] ?? "").matchAll(/"([^"]*)"/g)].map(
      (match) => match[1],
    );

    expect(classes.length).toBeGreaterThan(0);
    expect(classes.filter((entry) => /\bfs-/.test(entry))).toEqual([]);
    expect(source).toMatch(
      /iconOnlyActive \? ICON_ONLY\[size\] : SIZES\[size\]/,
    );
  });

  it("draws every shortcut as the same keycap", () => {
    const KEYCAP = "px:1 br:sm bw:1 bc:current fs:xs fw:400 lh:4 ff:d";
    const uiDir = join(rootDir, "src/registry/ui");
    const wrong: string[] = [];
    for (const file of readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))) {
      const source = readFileSync(join(uiDir, file), "utf-8");
      for (const tag of source.matchAll(/<kbd\b[\s\S]*?>/g)) {
        if (!tag[0].includes(KEYCAP)) wrong.push(file);
      }
    }
    expect(wrong).toEqual([]);
  });

  it("puts every focus outline behind the focus gate", () => {
    const wrong: string[] = [];

    for (const id of componentFiles()) {
      const source = readFileSync(join(registryDir, `${id}.tsx`), "utf-8");
      if (!/\bFOCUS\b/.test(source)) continue;

      const declarations = source.match(/^const FOCUS = "[^"]*";$/gm) ?? [];
      if (declarations.length !== 1)
        wrong.push(`${id}: ${declarations.length} FOCUS`);

      for (const use of source.matchAll(/fv:[\w:/.-]+/g)) {
        const at = use.index ?? 0;
        const line = source.slice(source.lastIndexOf("\n", at) + 1, at);
        if (/^\s*(\/\/|\*)/.test(line)) continue;

        const owner =
          [...source.slice(0, at).matchAll(/^const (\w+)/gm)].pop()?.[1] ?? "";
        const gated =
          /FOCUS$|_OUTLINE$/.test(owner) ||
          enclosingStatement(source, at).includes("focus");

        if (!gated) wrong.push(`${id}: ${use[0]} outside the gate`);
      }

      if (!source.includes("focus?: boolean | string"))
        wrong.push(`${id}: no focus prop`);

      for (const use of source.matchAll(/(?<![\w.])[A-Z]*_?FOCUS(?![\w.])/g)) {
        const at = use.index ?? 0;
        const statement = enclosingStatement(source, at);
        if (/\bconst [A-Z_]*FOCUS\b/.test(statement)) continue;
        if (!/\bconst \w+ =/.test(statement) || !statement.includes("focus"))
          wrong.push(`${id}: FOCUS read outside the gate, in \`${statement}\``);
      }

      const folds =
        /const \w*[Oo]utline =[^;]*(focus === true \? ""|typeof focus)/;
      if (!folds.test(source))
        wrong.push(`${id}: the gate drops a focus string`);
    }

    expect(wrong).toEqual([]);
  });

  it("calls the focus indicator an outline in the source too", () => {
    const offenders: string[] = [];

    for (const dir of ["src/registry/ui", "src/registry/meta"]) {
      for (const file of readdirSync(join(rootDir, dir))) {
        const source = readFileSync(join(rootDir, dir, file), "utf-8");
        for (const hit of source.matchAll(/\brings?\b|_RINGS?\b/gi)) {
          offenders.push(`${file}: ${hit[0]}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  it("keeps a loading control in the tab order", () => {
    const wrong: string[] = [];

    for (const id of componentFiles()) {
      const source = readFileSync(join(registryDir, `${id}.tsx`), "utf-8");
      if (!/\bloading\?:/.test(source)) continue;

      const folded = [...source.matchAll(/disabled=\{([^}]*)\}/g)].some(
        (match) =>
          /\bloading\b/.test(match[1]) || /\binactive\b/.test(match[1]),
      );
      if (!folded) continue;

      if (!source.includes("focusableWhenDisabled")) wrong.push(id);
    }

    expect(wrong).toEqual([]);
  });

  it("puts the shared props in one order, after the component's own", () => {
    const rank = new Map<string, number>(
      SHARED_PROP_ORDER.map((name, index) => [name, index]),
    );
    const wrong: string[] = [];

    for (const file of readdirSync(join(rootDir, "src/registry/meta"))) {
      const names: string[] = (
        JSON.parse(
          readFileSync(join(rootDir, "src/registry/meta", file), "utf-8"),
        ).props ?? []
      ).map((prop: { name: string }) => prop.name);

      const shared = names.filter((name) => rank.has(name));
      const own = names.filter((name) => !rank.has(name));

      if (shared.length > 0 && own.length > 0) {
        const firstShared = names.indexOf(shared[0]);
        const lastOwn = names.lastIndexOf(own[own.length - 1]);
        if (firstShared < lastOwn)
          wrong.push(`${file}: ${own[own.length - 1]} sits below ${shared[0]}`);
      }

      const ranks = shared.map((name) => rank.get(name) ?? 0);
      if (ranks.some((value, index) => index > 0 && value < ranks[index - 1]))
        wrong.push(`${file}: ${shared.join(" ")}`);
    }

    expect(wrong, "run `node scripts/order-props.mjs` to sort these").toEqual(
      [],
    );
  });

  it("carries every prop description into the component", () => {
    const metaDir = join(rootDir, "src/registry/meta");
    const bare: string[] = [];

    for (const file of readdirSync(metaDir).sort()) {
      const id = file.replace(/\.json$/, "");
      const meta = JSON.parse(readFileSync(join(metaDir, file), "utf8"));
      const source = readFileSync(join(registryDir, `${id}.tsx`), "utf8");
      const described = new Map<string, string>(
        (meta.props ?? []).map(
          (prop: { name: string; description: string }) => [
            prop.name,
            prop.description,
          ],
        ),
      );

      const match = /export interface \w+Props[^{]*\{([\s\S]*?)\n\}/.exec(
        source,
      );
      if (!match) {
        bare.push(`${id}: no Props interface`);
        continue;
      }

      for (const entry of match[1].matchAll(
        /\/\*\*([\s\S]*?)\*\/\n {2}(\w+)\??:|^ {2}(\w+)\??:/gm,
      )) {
        const name = entry[2] ?? entry[3];
        const wanted = described.get(name);
        if (!wanted) continue;

        const got = (entry[1] ?? "")
          .replace(/^\s*\*/gm, "")
          .replace(/\s+/g, " ")
          .trim();
        if (got !== wanted) bare.push(`${id}.${name}`);
      }
    }

    expect(
      bare,
      "run `node scripts/doc-comments.mjs` to carry these across",
    ).toEqual([]);
  });

  it("is not empty", () => {
    expect(mappedIds().length).toBeGreaterThan(0);
  });

  it("gives each prop the default its schema documents", () => {
    const drift: string[] = [];
    for (const file of readdirSync(join(rootDir, "src/registry/meta"))) {
      const id = file.replace(".json", "");
      const sourcePath = join(registryDir, `${id}.tsx`);
      if (!existsSync(sourcePath)) continue;
      const source = readFileSync(sourcePath, "utf8");
      const meta = JSON.parse(
        readFileSync(join(rootDir, "src/registry/meta", file), "utf8"),
      );
      for (const prop of meta.props ?? []) {
        if (prop.default === undefined || typeof prop.default === "object")
          continue;
        const found = source.match(
          new RegExp(`^\\s+${prop.name} = (.+?),$`, "m"),
        );
        if (!found) continue;
        if (
          found[1] !== JSON.stringify(prop.default) &&
          found[1] !== String(prop.default)
        ) {
          drift.push(
            `${id}.${prop.name}: schema ${JSON.stringify(prop.default)}, code ${found[1]}`,
          );
        }
      }
    }
    expect(drift).toEqual([]);
  });

  it("sizes every demo icon with classes Yumma generates", async () => {
    const sizes = new Set<string>();
    for (const file of readdirSync(join(rootDir, "src/registry/meta"))) {
      const text = readFileSync(
        join(rootDir, "src/registry/meta", file),
        "utf8",
      );
      for (const [, size] of text.matchAll(
        /"\$icon": "[^"]+",\s*"size": "([^"]+)"/g,
      )) {
        for (const cls of size.split(/\s+/)) sizes.add(cls);
      }
    }
    expect(sizes.size).toBeGreaterThan(0);
    // the roles come from the config the CLI installs
    const config = (await import("../yumma.config.mjs")).default as Config;
    const { invalid } = await validateClasses([...sizes], config);
    expect(invalid).toEqual([]);
  });
});
