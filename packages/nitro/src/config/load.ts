import { statSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { pathToFileURL } from "node:url";
import { type Config, ConfigSchema, configName } from "./schema";

export interface LoadConfigOptions {
	/**
	 * Directory to resolve the config file from.
	 *
	 * @default process.cwd()
	 */
	cwd?: string;

	/**
	 * Explicit path to the config file, absolute or relative to `cwd`.
	 */
	path?: string;

	/**
	 * Inline configuration. When provided, no config file is read.
	 */
	config?: Config;
}

export interface LoadedConfig {
	config: Config;
	/**
	 * Absolute path of the loaded config file, or null for inline configs.
	 */
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

	// The mtime query busts the ESM import cache so config edits are
	// picked up by long-running dev servers.
	const mtime = statSync(path).mtimeMs;
	const url = `${pathToFileURL(path).href}?t=${mtime}`;

	const { default: userConfig } = (await import(url)) as { default: Config };

	return { config: ConfigSchema.parse(userConfig), path };
}
