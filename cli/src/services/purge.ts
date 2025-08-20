import { globby } from "globby";
import { PurgeCSS } from "purgecss";
import { InternalConfig } from "../config/template.js";

export async function purge(
  css: string,
  config: InternalConfig
): Promise<string> {
  const purgeCSSResult = await new PurgeCSS().purge({
    content: await globby(config.source),
    css: [{ raw: css }],
    defaultExtractor: (content) => {
      return content.match(/[\w-/\\:]+/g) || [];
    },
  });

  return purgeCSSResult[0].css;
}
