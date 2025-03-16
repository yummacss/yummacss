import { transform } from "lightningcss";
export function minifyCSS(css, config) {
    try {
        const result = transform({
            filename: "style.css",
            code: Buffer.from(css),
            minify: config.buildOptions.minify,
            sourceMap: false,
        });
        return result.code.toString();
    }
    catch (error) {
        console.error("Minification error:", error);
        throw error;
    }
}
