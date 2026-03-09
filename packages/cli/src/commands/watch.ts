import { watch as fsWatch } from "node:fs";
import type { Config } from "@yummacss/nitro";
import { glob } from "tinyglobby";
import { loadConfig } from "@/services/loader";
import { feedback } from "@/utils/feedback";
import { cli } from "@/utils/status";
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

		await build(currentConfig, true);

		cli.info(feedback.watch.start);

		const files = await glob(currentConfig.source);
		for (const file of files) {
			fsWatch(file, (event) => {
				handleChange(file, event);
			});
		}
	} catch (_error) {
		cli.fail(feedback.watch.fail);
		process.exit(1);
	}
}
