import { existsSync } from "node:fs";
import { type Config, configName, loadConfig as load } from "@yummacss/nitro";
import { logger } from "@/utils/logger";

export async function loadConfig(): Promise<Config> {
	try {
		const { config } = await load();
		return config;
	} catch (_error) {
		if (!existsSync(configName)) {
			logger.fail(logger.init.notFound());
			return process.exit(1);
		}
		logger.fail(logger.init.invalid());
		return process.exit(1);
	}
}
