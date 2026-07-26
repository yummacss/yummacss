import { z } from "zod";

export const configName = "yumma.config.mjs";

/**
 * Configure Yumma CSS.
 */
export interface Config {
	/**
	 * Files to scan for Yumma CSS classes.
	 *
	 * @example ["./src/**\/*.{ts,tsx}"]
	 * @default [""]
	 */
	source?: string[];

	/**
	 * Path to output the generated CSS file.
	 *
	 * @example "./dist/output.css"
	 * @default ""
	 */
	output?: string;

	/**
	 * Prefix to namespace all generated classes.
	 *
	 * @example "ui-"
	 */
	prefix?: string;

	/**
	 * Reset default browser styles. Provide false to skip generating base resets.
	 *
	 * @default true
	 */
	normalize?: boolean;

	/**
	 * Classes that are always generated, regardless of whether they exist in source files.
	 *
	 * @example ["bg-red-5", "c-white"]
	 */
	safelist?: string[];

	/**
	 * Customize the default design system.
	 */
	theme?: {
		/**
		 * Add custom colors to the palette.
		 * Provide base colors and Yumma CSS generates the full shade scale automatically.
		 *
		 * A color may also be a light/dark pair, which resolves per color scheme
		 * via CSS `light-dark()`. Both sides are scaled independently, so every
		 * shade of a paired color is itself a pair.
		 *
		 * @example { purple: "#9333EA" }
		 * @example { surface: { light: "#ffffff", dark: "#111214" } }
		 */
		colors?: Record<string, string | { light: string; dark: string }> & {
			/**
			 * Control shade generation aggressiveness.
			 */
			percentage?: {
				/**
				 * Adjust the percentage of white mixed into lighter shades per step.
				 * @default 14
				 */
				light?: number;

				/**
				 * Adjust the percentage of black mixed into darker shades per step.
				 * @default 14
				 */
				dark?: number;
			};
		};

		/**
		 * Override or extend the default breakpoints.
		 *
		 * @example { sm: "40rem", md: "48rem", lg: "64rem", xl: "80rem", xxl: "96rem" }
		 */
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

/**
 * Define your Yumma CSS configuration.
 *
 * @param config - The configuration options to customize Yumma CSS.
 * @returns The resolved configuration object.
 */
export function defineConfig(config: Config): Config {
	return config;
}
