import { existsSync } from "node:fs";
import { type Config, configName, loadConfig as load } from "@yummacss/nitro";
import { logger } from "@/utils/logger";

export async function loadConfig(): Promise<Config> {
	try {
		const { config } = await load();
		return config;
	} catch (error) {
		if (!existsSync(configName)) {
			logger.fail(logger.init.notFound());
			return process.exit(1);
		}
		const missing = missingPackage(error);
		logger.fail(
			missing ? logger.init.notInstalled(missing) : logger.init.invalid(),
		);
		return process.exit(1);
	}
}

// the package a config imports that is not installed, as `import()` names it
function missingPackage(error: unknown): string | undefined {
	if ((error as { code?: string })?.code !== "ERR_MODULE_NOT_FOUND") {
		return undefined;
	}
	return /Cannot find (?:package|module) '([^']+)'/.exec(
		(error as Error).message,
	)?.[1];
}
