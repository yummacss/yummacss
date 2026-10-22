import { parseSelectors, rulesFor } from "../utils/normalize-rules.mjs";

function visit(node, fn) {
  fn(node);
  for (const child of node.children ?? []) visit(child, fn);
}

export default function rehypeNormalize() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "element" || node.tagName !== "code") return;

      const match = (node.data?.meta || "").match(/normalize=["']([^"']+)["']/);
      if (!match) return;

      node.children = [
        { type: "text", value: rulesFor(parseSelectors(match[1])) },
      ];
    });
  };
}
