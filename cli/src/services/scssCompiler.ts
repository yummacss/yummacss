import { existsSync } from "fs";
import { dirname, join } from "path";
import * as sass from "sass-embedded";
import { fileURLToPath } from "url";
import type { Configuration } from "../config/defaultConfig.js";

// Find package root by looking for package.json
function findPackageRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  let currentDir = dirname(__filename);

  // Keep going up until we find package.json or reach root
  while (currentDir !== dirname(currentDir)) {
    const packageJsonPath = join(currentDir, "package.json");
    if (existsSync(packageJsonPath)) {
      return currentDir;
    }
    currentDir = dirname(currentDir);
  }

  // Fallback: assume we're in node_modules/yummacss
  return currentDir;
}

const packageRoot = findPackageRoot();

export async function compileSCSS(config: Configuration): Promise<{
  css: string;
  dependencies: string[];
}> {
  const scssFile = config.buildOptions.reset ? "index.scss" : "core.scss";

  try {
    const result = await sass.compileAsync(join(packageRoot, "src", scssFile), {
      style: "expanded",
      loadPaths: [join(packageRoot, "src")],
      importers: [
        {
          findFileUrl(url) {
            return new URL(url, `file://${join(packageRoot, "src/")}`);
          },
        },
      ],
    });

    return {
      css: result.css,
      dependencies: result.loadedUrls
        .filter((url) => url.protocol === "file:")
        .map((url) => fileURLToPath(url)),
    };
  } catch (error) {
    console.error("SCSS compilation error:", error);
    throw error;
  }
}
