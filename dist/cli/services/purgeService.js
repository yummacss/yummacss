import { globby } from "globby";
import { PurgeCSS } from "purgecss";
export async function purgeCSS(css, config) {
    const purgeCSSResult = await new PurgeCSS().purge({
        content: await globby(config.source),
        css: [{ raw: css }],
        defaultExtractor: (content) => {
            return content.match(/[\w-/\\:]+/g) || [];
        },
    });
    return purgeCSSResult[0].css;
}
