import { join } from "path";
import { pathToFileURL } from "url";
import { defaultConfig } from "../config/defaultConfig.js";
export async function loadConfig() {
    const configPath = join(process.cwd(), "yumma.config.js");
    const configUrl = pathToFileURL(configPath).href;
    const { default: userConfig } = (await import(configUrl));
    return {
        ...defaultConfig,
        ...userConfig,
        buildOptions: {
            ...defaultConfig.buildOptions,
            ...userConfig.buildOptions,
        },
    };
}
