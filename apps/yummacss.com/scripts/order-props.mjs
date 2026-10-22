import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const metaDir = join(rootDir, "src/registry/meta");

const source = readFileSync(join(rootDir, "src/utils/props.ts"), "utf8");
const block = /export const SHARED_PROP_ORDER = \[([\s\S]*?)\] as const;/.exec(
  source,
);

if (!block)
  throw new Error("SHARED_PROP_ORDER not found in src/utils/props.ts");

const order = [...block[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
const rank = new Map(order.map((name, index) => [name, index]));

let changed = 0;

for (const file of readdirSync(metaDir).sort()) {
  const path = join(metaDir, file);
  const meta = JSON.parse(readFileSync(path, "utf8"));
  if (!meta.props?.length) continue;

  const before = meta.props.map((prop) => prop.name).join();
  const own = meta.props.filter((prop) => !rank.has(prop.name));
  const shared = meta.props
    .filter((prop) => rank.has(prop.name))
    .sort((a, b) => rank.get(a.name) - rank.get(b.name));

  meta.props = [...own, ...shared];
  if (meta.props.map((prop) => prop.name).join() === before) continue;

  writeFileSync(path, `${JSON.stringify(meta, null, 2)}\n`);
  changed++;
}

console.log(
  changed
    ? `ordered ${changed} schema(s) -> run \`biome format --write src/registry/meta/\``
    : "every schema is already in order",
);
