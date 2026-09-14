import { z } from "zod";

export const configName = "yumma.config.mjs";

export interface Config {
	source?: string[];

	output?: string;

	prefix?: string;

	normalize?: boolean;

	safelist?: string[];

	theme?: {
		colors?: Record<string, string | { light: string; dark: string }> & {
			percentage?: {
				light?: number;

				dark?: number;
			};
		};

		screens?: Record<string, string>;
	};
}

export const ConfigSchema = z.object({
	source: z.array(z.string()).default([""]),
	output: z.string().default(""),
	prefix: z.string().optional(),
	normalize: z.boolean().default(true),
	safelist: z.array(z.string()).optional(),
	theme: z
		.object({
			colors: z.record(z.string(), z.any()).optional(),
			screens: z.record(z.string(), z.string()).optional(),
		})
		.optional(),
});

export function defineConfig(config: Config): Config {
	return config;
}
