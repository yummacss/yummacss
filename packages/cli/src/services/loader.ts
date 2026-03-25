import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { type Config, ConfigSchema, configName } from "@yummacss/nitro";
import { logger } from "@/utils/logger";

export async function loadConfig(): Promise<Config> {
	const path = join(process.cwd(), configName);
	const url = pathToFileURL(path).href;

	try {
		const { default: userConfig } = (await import(url)) as {
			default: Config;
		};

		const config = ConfigSchema.parse(userConfig);
		return config;
	} catch (_error) {
		if (!existsSync(configName)) {
			logger.fail(logger.init.notFound());
			process.exit(1);
		}
		logger.fail(logger.init.invalid());
		process.exit(1);
	}
}
