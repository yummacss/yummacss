import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, relative } from "node:path";
import {
	type Config,
	configName,
	generator,
	loadConfig,
	scan,
	validateClasses,
} from "@yummacss/nitro";
import { m } from "../messages";

export interface Built {
	output: string;
	files: number;
	classes: number;
	bytes: number;
	ms: number;
}

// reads the config, or explains in one sentence why it cannot
export async function readConfig(path?: string): Promise<Config> {
	const file = path ?? configName;
	try {
		return (await loadConfig({ path })).config;
	} catch (error) {
		if ((error as { code?: string }).code === "ENOENT") {
			throw new Error(m.config.missing(file));
		}
		const reason = error instanceof Error ? error.message.split("\n")[0] : "";
		throw new Error(m.config.invalid(file, reason ?? ""));
	}
}

export async function build(config: Config, path?: string): Promise<Built> {
	if (!config.output) throw new Error(m.config.noOutput(path ?? configName));

	const start = performance.now();
	const { classes, files } = await scan(config.source ?? []);
	const css = generator(classes, config);

	mkdirSync(dirname(config.output), { recursive: true });
	writeFileSync(config.output, css);

	return {
		output: relative(process.cwd(), config.output).replace(/\\/g, "/"),
		files: files.length,
		classes: validateClasses(classes, config).valid.length,
		bytes: Buffer.byteLength(css),
		ms: Math.round(performance.now() - start),
	};
}
