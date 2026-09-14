import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { pathToFileURL } from "node:url";
import { type Config, ConfigSchema, configName } from "./schema";

export interface LoadConfigOptions {
	cwd?: string;

	path?: string;

	config?: Config;
}

export interface LoadedConfig {
	config: Config;
	path: string | null;
}

export async function loadConfig(
	options: LoadConfigOptions = {},
): Promise<LoadedConfig> {
	if (options.config) {
		return { config: ConfigSchema.parse(options.config), path: null };
	}

	const cwd = options.cwd ?? process.cwd();
	const path = options.path
		? isAbsolute(options.path)
			? options.path
			: join(cwd, options.path)
		: join(cwd, configName);

	const digest = createHash("sha1").update(readFileSync(path)).digest("hex");
	const url = `${pathToFileURL(path).href}?t=${digest}`;

	const { default: userConfig } = (await import(url)) as { default: Config };

	return { config: ConfigSchema.parse(userConfig), path };
}
