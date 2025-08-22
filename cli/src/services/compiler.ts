import { existsSync } from "fs";
import { dirname, join } from "path";
import * as sass from "sass-embedded";
import { fileURLToPath } from "url";
import type { InternalConfig } from "../config/template.js";
import { message } from "../utils/message.js";
import { cli } from "../utils/status.js";

function findRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  let currentDir = dirname(__filename);

  while (currentDir !== dirname(currentDir)) {
    const packagePath = join(currentDir, "package.json");
    if (existsSync(packagePath)) {
      return currentDir;
    }
    currentDir = dirname(currentDir);
  }

  return currentDir;
}

const pkg = findRoot();

export async function compile(config: InternalConfig): Promise<{
  css: string;
  dependencies: string[];
}> {
  const entryFile = config.buildOptions.reset ? "index.scss" : "core.scss";

  try {
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
  } catch (error) {
    cli.error(
      error instanceof Error ? error.message : message.common.unknownError
    );
    throw error;
  }
}
