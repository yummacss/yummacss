import { z } from "zod";

export const configName = "yumma.config.mjs";

export const ConfigSchema = z.object({
	source: z.array(z.string()).default([""]),
	output: z.string().default(""),
	buildOptions: z
		.object({
			reset: z.boolean().default(true),
			minify: z.boolean().default(false),
		})
		.default({ reset: true, minify: false }),
});

export type Config = z.infer<typeof ConfigSchema>;

export function defineConfig(config: Config): Config {
	return config;
}
