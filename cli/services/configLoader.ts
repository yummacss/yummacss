import { join, extname } from "path";
import { pathToFileURL } from "url";
import { existsSync } from "fs";
import { YummaConfig, defaultConfig } from "../config/defaultConfig.js";
import { getSupportedExtensions } from "../config/templates.js";

const CONFIG_BASE = "yumma.config";
const SUPPORTED_EXTENSIONS = getSupportedExtensions();

const EXTENSION_LOADERS: Record<string, (path: string) => Promise<any>> = {
  ".js": async (path) => {
    const configUrl = pathToFileURL(path).href;
    return (await import(configUrl)).default;
  },
};

function findConfigFile(cwd: string): string | null {
  for (const ext of SUPPORTED_EXTENSIONS) {
    const file = join(cwd, `${CONFIG_BASE}${ext}`);
    if (existsSync(file)) return file;
  }
  return null;
}

export async function loadConfig(): Promise<YummaConfig> {
  const cwd = process.cwd();
  const configPath = findConfigFile(cwd);

  if (!configPath) {
    throw new Error(
      `No config file found. Supported: ${CONFIG_BASE}${SUPPORTED_EXTENSIONS.join(", ")}`
    );
  }

  const ext = extname(configPath);
  const loader = EXTENSION_LOADERS[ext];
  if (!loader) {
    throw new Error(`Unsupported config file extension: ${ext}`);
  }

  const userConfig = await loader(configPath);

  return {
    ...defaultConfig,
    ...userConfig,
    buildOptions: {
      ...defaultConfig.buildOptions,
      ...userConfig.buildOptions,
    },
  };
}
