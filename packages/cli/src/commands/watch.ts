import { watch as fsWatch, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { Config } from "@yummacss/nitro";
import { glob } from "tinyglobby";
import { configChanged, getCache, setCache } from "@/services/cache";
import { compiler } from "@/services/compiler";
import { loadConfig } from "@/services/loader";
import { logger } from "@/utils/logger";
import { build } from "./build.js";

let currentConfig: Config;
let buildTimeout: NodeJS.Timeout | null = null;
const changedFiles = new Set<string>();

function handleChange(path: string, _event: string) {
	changedFiles.add(path);

	if (buildTimeout) {
		clearTimeout(buildTimeout);
	}

	buildTimeout = setTimeout(async () => {
		if (changedFiles.size > 0) {
			await build(currentConfig, true);
			changedFiles.clear();
		}
		buildTimeout = null;
	}, 500);
}

export async function watch() {
	try {
		currentConfig = await loadConfig();

		const status = logger.watch.start();

		try {
			const cache = getCache();
			const hasConfigChanged = configChanged(currentConfig);

			let css: string;
			if (hasConfigChanged || !cache.css) {
				const res = await compiler(currentConfig);
				css = res.css;
				setCache({
					configHash: JSON.stringify(currentConfig),
					css: res.css,
					dependencies: res.dependencies,
				});
			} else {
				css = cache.css ?? "";
			}

			const collected = Array.from(
				await glob(currentConfig.source ?? []),
			).length;

			status.succeed(logger.watch.success(collected));

			if (!currentConfig.output)
				throw new Error("No output path specified in config.");

			const sourceFiles = await glob(currentConfig.source ?? []);
			const compileResult = logger.watch.compiling(sourceFiles);

			mkdirSync(dirname(currentConfig.output), { recursive: true });
			writeFileSync(currentConfig.output, css);

			compileResult.success(
				currentConfig.output,
				Buffer.byteLength(css, "utf-8"),
			);
		} catch (_err) {
			status.fail(logger.watch.fail());
			process.exit(1);
		}

		if (!currentConfig.source)
			throw new Error("No source patterns specified in config.");

		const files = await glob(currentConfig.source);
		for (const file of files) {
			fsWatch(file, (event) => {
				handleChange(file, event);
			});
		}
	} catch (_error) {
		logger.fail(logger.watch.fail());
		process.exit(1);
	}
}
