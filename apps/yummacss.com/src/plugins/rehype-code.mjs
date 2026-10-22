import { visit } from "unist-util-visit";

export default function rehypeCode() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "pre") return;

      const codeEl = node.children?.find((c) => c.tagName === "code");
      if (!codeEl) return;

      const meta = codeEl.data?.meta ?? node.properties?.["data-meta"] ?? "";

      const titleMatch =
        typeof meta === "string" ? meta.match(/title=["']([^"']+)["']/) : null;
      const title = titleMatch?.[1] ?? null;
      const isPreview =
        typeof meta === "string" && meta.split(" ").includes("preview");

      const langClass = codeEl.properties?.className?.find?.(
        (c) => typeof c === "string" && c.startsWith("language-"),
      );
      const lang = langClass ? langClass.replace("language-", "") : null;

      const code = (codeEl.children ?? [])
        .filter((c) => c.type === "text")
        .map((c) => c.value)
        .join("");

      node.tagName = "Code";
      node.children = [];
      node.properties = {
        code,
        ...(meta ? { meta } : {}),
        ...(title ? { title } : {}),
        ...(lang ? { lang } : {}),
        ...(isPreview ? { preview: true } : {}),
      };
    });
  };
}
