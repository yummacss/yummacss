import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { type Config, ConfigSchema, configName } from "@yummacss/nitro";
import { z } from "zod";
import { message } from "@/utils/message";
import { cli } from "@/utils/status";

export async function loadConfig(): Promise<Config> {
	const path = join(process.cwd(), configName);
	const url = pathToFileURL(path).href;

	try {
		const { default: userConfig } = (await import(url)) as {
			default: Config;
		};

		const config = ConfigSchema.parse(userConfig);
		return config;
	} catch (error) {
		if (!existsSync(configName)) {
			const status = cli.progress(message.init.notFound);
			status.warn(message.init.notFound);
			process.exit(1);
		} else if (error instanceof z.ZodError) {
			const status = cli.progress(message.init.invalid);
			status.fail(message.init.invalid);
			process.exit(1);
		}
		throw error;
	}
}
