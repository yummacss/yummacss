import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const metaDir = join(rootDir, "src/registry/meta");
const uiDir = join(rootDir, "src/registry/ui");

// props the interface declares but the prop table does not, so the meta files
// stay the docs site's list and these still document themselves on hover
const EXTRA = {
  className:
    "Extra classes. `merge` folds them in last, so one here replaces the component's own class for the same utility.",
  "autocomplete.onQueryChange": "Called with the text as it is typed.",
  "avatar.children":
    "Drawn inside the avatar, in place of an image or initials.",
  "avatar.tint":
    "Recolors the fallback. It reaches the initials and the icon, never an image.",
  "avatar-stack.children": "The avatars. Each one overlaps the one before it.",
  "badge.children": "The badge's label.",
  "button.children": "The button's label.",
  "button-group.children": "The buttons, spaced and rounded as one control.",
  "checkbox-group.children": "The checkboxes.",
  "preview-card.children": "The card's contents.",
  "switch.ariaLabel":
    "The accessible name, for a switch with no visible label.",
  "textarea.onChange": "Called on every input event.",
  "toggle-group.children": "The toggles.",
};

const MAX = 80;

function block(text, indent) {
  const pad = " ".repeat(indent);
  const single = `${pad}/** ${text} */`;
  if (single.length <= MAX) return `${single}\n`;

  const width = MAX - indent - 3;
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && `${line} ${word}`.length > width) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);

  return `${pad}/**\n${lines.map((l) => `${pad} * ${l}`).join("\n")}\n${pad} */\n`;
}

// a rerun has to start from the file as it was written, or every pass would
// nest the comment it added last time; only the comments it writes are removed
const BLOCK = String.raw`[ \t]*\/\*\*(?:(?!\*\/)[\s\S])*\*\/\n`;

function strip(source) {
  const props = /export interface \w+Props[^{]*\{([\s\S]*?)\n\}/.exec(source);
  if (props) {
    source = source.replace(
      props[1],
      props[1].replace(new RegExp(`^${BLOCK}`, "gm"), ""),
    );
  }
  return source.replace(
    new RegExp(`^${BLOCK}(?=export default function)`, "m"),
    "",
  );
}

let documented = 0;
let touched = 0;

for (const file of readdirSync(metaDir).sort()) {
  const id = file.replace(/\.json$/, "");
  const path = join(uiDir, `${id}.tsx`);
  const meta = JSON.parse(readFileSync(join(metaDir, file), "utf8"));
  const described = new Map(
    (meta.props ?? []).map((prop) => [prop.name, prop.description]),
  );

  const before = readFileSync(path, "utf8");
  let source = strip(before);

  const match = /export interface \w+Props[^{]*\{([\s\S]*?)\n\}/.exec(source);
  if (!match) throw new Error(`no Props interface in ${id}.tsx`);

  const body = match[1].replace(/^ {2}(\w+)\??:/gm, (line, name) => {
    const text = described.get(name) ?? EXTRA[`${id}.${name}`] ?? EXTRA[name];
    if (!text) return line;
    documented++;
    return `${block(text, 2)}${line}`;
  });

  source = source.replace(match[1], body);

  if (meta.summary) {
    source = source.replace(
      /^export default function/m,
      `${block(meta.summary, 0)}export default function`,
    );
  }

  if (source === before) continue;
  writeFileSync(path, source);
  touched++;
}

console.log(`${documented} props documented across ${touched} files`);
