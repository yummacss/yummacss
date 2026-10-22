export interface DocProperty {
  name: string;
  anchor: string;
  title: string;
}

export function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const NAMES = /<Reference[^>]*names=\{\[([^\]]+)\]\}/g;

const titleCase = (name: string) =>
  name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** Each property in a Reference's names list; its row in the prefix table carries the anchor. */
export function extractProperties(content: string): DocProperty[] {
  const out: DocProperty[] = [];
  for (const [, list] of content.matchAll(NAMES)) {
    for (const [, name] of list.matchAll(/"([^"]+)"/g)) {
      out.push({ name, title: titleCase(name), anchor: generateId(name) });
    }
  }
  return out;
}
