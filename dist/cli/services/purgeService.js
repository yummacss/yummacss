import { PurgeCSS } from "purgecss";
export async function purgeCSS(css, config) {
    const purgeCSSResult = await new PurgeCSS().purge({
        content: config.source,
        css: [
            {
                raw: css,
            },
        ],
    });
    return purgeCSSResult[0].css;
}
