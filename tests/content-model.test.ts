import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EXAMPLE_ICON_STYLE } from "../src/utils/icon-style";
import { rootDir } from "./helpers";

const ORG =
  /\b(?:teams?|members?|invitations?|invites?|invited|sprints?|invoices?|subscriptions?|billing|collaborat\w*|assignees?|reassign\w*|workspaces?|onboard(?:ing)? your team)\b/i;

const PEOPLE = new Set(["avatar", "avatar-stack", "preview-card"]);

const metaDir = join(rootDir, "src/registry/meta");
const uiDir = join(rootDir, "src/registry/ui");

const schemas = readdirSync(metaDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => ({
    id: file.replace(/\.json$/, ""),
    meta: JSON.parse(readFileSync(join(metaDir, file), "utf8")),
  }));

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (typeof value === "object" && value !== null) {
    return Object.values(value).flatMap(strings);
  }
  return [];
}

function examples(meta: {
  props?: { name: string; example?: unknown }[];
  scene?: unknown;
}): { where: string; text: string }[] {
  const out: { where: string; text: string }[] = [];

  for (const prop of meta.props ?? []) {
    for (const text of strings(prop.example)) {
      out.push({ where: prop.name, text });
    }
  }
  for (const text of strings(meta.scene)) out.push({ where: "scene", text });

  return out;
}

describe("content model", () => {
  it("has examples to read", () => {
    const total = schemas.reduce(
      (count, { meta }) => count + examples(meta).length,
      0,
    );
    expect(total).toBeGreaterThan(150);
  });

  it("keeps the examples out of an organisation", () => {
    const found: string[] = [];

    for (const { id, meta } of schemas) {
      for (const { where, text } of examples(meta)) {
        const match = text.match(ORG);
        if (match) found.push(`${id}:${where}  ->  "${match[0]}"`);
      }
    }

    expect(found).toEqual([]);
  });

  it("keeps people to the components that are about people", () => {
    const found: string[] = [];

    for (const file of readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))) {
      const id = file.replace(/\.tsx$/, "");
      if (
        PEOPLE.has(id) ||
        [...PEOPLE].some((one) => id.startsWith(`${one}-`))
      ) {
        continue;
      }

      const source = readFileSync(join(uiDir, file), "utf8");
      if (source.includes("dicebear")) found.push(file);
    }

    for (const { id, meta } of schemas) {
      if (PEOPLE.has(id)) continue;
      for (const { where, text } of examples(meta)) {
        if (text.includes("dicebear")) found.push(`${id}:${where}`);
      }
    }

    expect(found).toEqual([]);
  });

  it("names icons the demo can render", () => {
    const known = new Set(Object.keys(EXAMPLE_ICON_STYLE));

    expect(known.size).toBeGreaterThan(15);

    const missing: string[] = [];
    for (const { id, meta } of schemas) {
      const named = JSON.stringify(meta).matchAll(/"\$icon":\s*"([^"]+)"/g);
      for (const [, name] of named) {
        if (!known.has(name)) missing.push(`${id}  ->  ${name}`);
      }
    }

    expect(missing).toEqual([]);
  });
});
