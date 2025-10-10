import { loadConfig } from "@/services/loader";
import { message } from "@/utils/message";
import { cli } from "@/utils/status";
import type { Config } from "@yummacss/nitro";
import chok from "chokidar";
import { globby } from "globby";
import { build } from "./build.js";

let currentConfig: Config;
let buildTimeout: NodeJS.Timeout | null = null;
const changedFiles = new Set<string>();

function handleChange(path: string, event: string) {
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

		await build(currentConfig, true);

		cli.info(message.watch.start);

		const files = await globby(currentConfig.source);
		const watcher = chok.watch(files, {
			awaitWriteFinish: {
				pollInterval: 50,
				stabilityThreshold: 200,
			},
			ignored: /(^|[/\\])\../,
			ignoreInitial: true,
			persistent: true,
		});

		watcher
			.on("add", (path) => handleChange(path, "added"))
			.on("change", (path) => handleChange(path, "changed"))
			.on("unlink", (path) => handleChange(path, "removed"));
	} catch (error) {
		cli.fail(message.watch.fail);
		process.exit(1);
	}
}
