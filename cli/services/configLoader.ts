import { join } from "path";
import { pathToFileURL } from "url";

import { YummaConfig, defaultConfig } from "../config/defaultConfig.js";

export async function loadConfig(): Promise<YummaConfig> {
  const configPath = join(process.cwd(), "yumma.config.js");
  const configUrl = pathToFileURL(configPath).href;
  const { default: userConfig } = (await import(configUrl)) as {
    default: Partial<YummaConfig>;
  };

  return {
    ...defaultConfig,
    ...userConfig,
    buildOptions: {
      ...defaultConfig.buildOptions,
      ...userConfig.buildOptions,
    },
  };
}
