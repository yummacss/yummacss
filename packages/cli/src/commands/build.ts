import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { Config } from "@yummacss/nitro";
import { glob } from "tinyglobby";
import { configChanged, getCache, setCache } from "@/services/cache";
import { compiler } from "@/services/compiler";
import { loadConfig } from "@/services/loader";
import { logger } from "@/utils/logger";

export async function build(existingConfig?: Config, forceRebuild = false) {
	const collectStatus = logger.build.start();
	const startTime = Date.now();

	try {
		const config = existingConfig || (await loadConfig());
		const cache = getCache();
		const hasConfigChanged = configChanged(config);

		let css: string;
		let dependencies: string[];
		if (forceRebuild || hasConfigChanged || !cache.css) {
			const res = await compiler(config);
			css = res.css;
			dependencies = res.dependencies;
			setCache({
				configHash: JSON.stringify(config),
				css: res.css,
				dependencies: res.dependencies,
			});
		} else {
			css = cache.css ?? "";
			dependencies = cache.dependencies ?? [];
		}

		const sourceFiles = await glob(config.source ?? []);
		const collected = Array.from(sourceFiles).length;

		collectStatus.succeed(
			logger.build.success(Date.now() - startTime, collected),
		);

		if (!config.output) throw new Error("No output path specified in config.");

		const compileResult = logger.build.compiling(sourceFiles);
		const compileStart = Date.now();

		mkdirSync(dirname(config.output), { recursive: true });
		writeFileSync(config.output, css);

		compileResult.success(config.output, Buffer.byteLength(css, "utf-8"));

		process.stdout.write(
			`\n\n${logger.build.written(Date.now() - compileStart)}\n\n`,
		);
	} catch (error) {
		collectStatus.fail(logger.build.fail(error));
		process.exit(1);
	}
}