import { globby } from "globby";
import { PurgeCSS } from "purgecss";
import { Configuration } from "../config/defaultConfig.js";

export async function purgeCSS(css: string, config: Configuration): Promise<string> {
  const purgeCSSResult = await new PurgeCSS().purge({
    content: await globby(config.source),
    css: [{ raw: css }],
    defaultExtractor: (content) => {
      return content.match(/[\w-/\\:]+/g) || [];
    },
  });

  return purgeCSSResult[0].css;
}
