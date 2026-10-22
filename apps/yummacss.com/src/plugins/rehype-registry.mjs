import fs from "node:fs";
import path from "node:path";

const isDev = process.env.NODE_ENV !== "production";
const fileCache = new Map();

export default function rehypeRegistry() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "code") {
        const textContent = node.children?.[0]?.value || "";
        const metaStr = node.data?.meta || "";

        let isInlineRegistry = false;
        const registryIdMatch = metaStr.match(/registryId=["']([^"']+)["']/i);
        let lang = "";
        let registryId = "";

        if (!registryIdMatch && textContent) {
          const inlineMatch = textContent.match(
            /^(\w+)\s+registryId=["']([^"']+)["']/i,
          );
          if (inlineMatch) {
            lang = inlineMatch[1];
            registryId = inlineMatch[2];
            isInlineRegistry = true;
          }
        } else if (registryIdMatch) {
          registryId = registryIdMatch[1];
        }

        if (registryId) {
          let filePath = path.join(
            process.cwd(),
            "src",
            "registry",
            "ui",
            `${registryId}.tsx`,
          );

          if (!fs.existsSync(filePath)) {
            filePath = path.join(
              process.cwd(),
              "src",
              "registry",
              "docs",
              `${registryId}.tsx`,
            );
          }

          if (fs.existsSync(filePath)) {
            if (isDev || !fileCache.has(filePath)) {
              fileCache.set(filePath, fs.readFileSync(filePath, "utf-8"));
            }
            const content = fileCache.get(filePath);

            if (isInlineRegistry) {
              node.tagName = "pre";
              node.properties = {};
              node.children = [
                {
                  type: "element",
                  tagName: "code",
                  properties: {
                    className: [`language-${lang}`],
                  },
                  data: {
                    meta: `registryId="${registryId}"`,
                  },
                  children: [{ type: "text", value: content }],
                },
              ];
            } else {
              node.children = [{ type: "text", value: content }];
            }
          } else {
            const errMsg = `// Error: Registry file not found: ${registryId}`;
            if (isInlineRegistry) {
              node.tagName = "pre";
              node.properties = {};
              node.children = [
                {
                  type: "element",
                  tagName: "code",
                  properties: { className: [`language-${lang || "tsx"}`] },
                  children: [{ type: "text", value: errMsg }],
                },
              ];
            } else {
              node.children = [{ type: "text", value: errMsg }];
            }
          }
        }
      }
    });
  };
}

function visit(node, type, handler) {
  if (node.type === type) {
    handler(node);
  }
  if (node.children) {
    for (const child of node.children) {
      visit(child, type, handler);
    }
  }
}
