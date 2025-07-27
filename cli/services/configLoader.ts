import { join } from "path";
import { pathToFileURL } from "url";
import { Configuration, defaultConfig } from "../config/defaultConfig.js";

export async function loadConfig(): Promise<Configuration> {
  const configPath = join(process.cwd(), "yumma.config.js");
  const configUrl = pathToFileURL(configPath).href;
  const { default: userConfig } = (await import(configUrl)) as {
    default: Partial<Configuration>;
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
