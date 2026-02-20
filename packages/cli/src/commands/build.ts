import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { Config } from "@yummacss/nitro";
import { configChanged, getCache, setCache } from "@/services/cache";
import { compiler } from "@/services/compiler";
import { loadConfig } from "@/services/loader";
import { minify } from "@/services/minify";
import { feedback } from "@/utils/feedback";
import { cli } from "@/utils/status";

export async function build(existingConfig?: Config, forceRebuild = false) {
	const status = cli.progress(feedback.build.start);
	const startTime = Date.now();

	try {
		const config = existingConfig || (await loadConfig());
		const cache = getCache();
		const hasConfigChanged = configChanged(config);

		let css: string;
		if (forceRebuild || hasConfigChanged || !cache.css) {
			const res = await compiler(config);
			css = res.css;
			setCache({
				configHash: JSON.stringify(config),
				css: res.css,
				dependencies: res.dependencies,
			});
		} else {
			css = cache.css;
		}

		const finalCSS = minify(css, config);
		mkdirSync(dirname(config.output), { recursive: true });
		writeFileSync(config.output, finalCSS);

		status.succeed(
			feedback.build.success(Date.now() - startTime, config.output),
		);
	} catch (error) {
		status.fail(
			`${feedback.build.fail} ${error instanceof Error ? error.message : String(error)}`,
		);
		process.exit(1);
	}
}
