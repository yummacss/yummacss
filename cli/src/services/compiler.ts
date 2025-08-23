import { existsSync } from "fs";
import { dirname, join } from "path";
import * as sass from "sass-embedded";
import { fileURLToPath } from "url";
import type { Config } from "../config/schema.js";

function findRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  let currentDir = dirname(__filename);

  while (currentDir !== dirname(currentDir)) {
    const path = join(currentDir, "package.json");
    if (existsSync(path)) {
      return currentDir;
    }
    currentDir = dirname(currentDir);
  }

  return currentDir;
}

const pkg = findRoot();

export async function compile(config: Config): Promise<{
  css: string;
  dependencies: string[];
}> {
  const entryFile = config.buildOptions.reset ? "index.scss" : "core.scss";

  const res = await sass.compileAsync(join(pkg, "src", entryFile), {
    style: "expanded",
    loadPaths: [join(pkg, "src")],
    importers: [
      {
        findFileUrl(url) {
          return new URL(url, `file://${join(pkg, "src/")}`);
        },
      },
    ],
  });

  return {
    css: res.css,
    dependencies: res.loadedUrls
      .filter((url) => url.protocol === "file:")
      .map((url) => fileURLToPath(url)),
  };
}
