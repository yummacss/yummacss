import { coreUtils, pseudoClasses, pseudoElements } from "@yummacss/core";
import { z } from "zod";

export const configName = "yumma.config.mjs";

/** Configures Yumma CSS. Pass it to `defineConfig` in `yumma.config.mjs`. */
export interface Config {
	/**
	 * Files to scan for Yumma CSS classes. Only classes found here are generated.
	 *
	 * @example ["./src/**\/*.{ts,tsx}"]
	 */
	source?: string[];

	/**
	 * Where to write the generated CSS.
	 *
	 * @example "./src/styles/out.css"
	 */
	output?: string;

	/**
	 * Namespaces every class, so `bg:red-5` is written `ui-bg:red-5`.
	 *
	 * @example "ui-"
	 */
	prefix?: string;

	/**
	 * Emits the base reset above your utilities.
	 *
	 * @default true
	 */
	normalize?: boolean;

	/**
	 * Classes to generate whether or not they appear in `source`. For a class
	 * assembled at runtime, which the scanner cannot see.
	 *
	 * @example ["bg:red-5", "c:white"]
	 */
	safelist?: string[];

	theme?: {
		/**
		 * Colors to generate utilities for, each with its own 12 shades. A
		 * `{ light, dark }` pair compiles to `light-dark()` and scales both sides.
		 *
		 * @example { brand: "#bec6f2", surface: { light: "#ffffff", dark: "#111214" } }
		 */
		colors?: Record<string, string | { light: string; dark: string }> & {
			/** Tunes how far shades travel toward white and black. */
			percentage?: {
				/** @default 10 */
				light?: number;

				/** @default 10 */
				dark?: number;
			};
		};

		/**
		 * Breakpoints to add to the defaults, keyed by the variant prefix. A key
		 * that collides replaces the default.
		 *
		 * @example { "3xl": "112rem" }
		 */
		screens?: Record<string, string>;

		/**
		 * Variants of your own, each a name and the selector it appends. The name
		 * is the prefix, so `closing:o:0` applies under the selector you give
		 * `closing`. Nothing is built in.
		 *
		 * @example { closing: "[data-ending-style]", open: "[open]" }
		 */
		states?: Record<string, string>;

		/**
		 * Font stacks to generate `ff:` utilities for, keyed by name. A key that
		 * collides replaces the default.
		 *
		 * @example { display: '"Esteban", serif', mono: 'ui-monospace, monospace' }
		 */
		fonts?: Record<string, string>;

		/**
		 * Keyframes to generate `an:` utilities for, keyed by name, each written
		 * as the body of a CSS `@keyframes` rule. Only the ones a class uses are
		 * emitted. Nothing is built in.
		 *
		 * @example { spin: "to { rotate: 360deg; }", "fade-in": "from { opacity: 0; }" }
		 */
		keyframes?: Record<string, string>;
	};
}

const BUILT_IN_VARIANTS = new Set<string>(
	[...pseudoClasses, ...pseudoElements].map(({ prefix }) => prefix),
);

const UTILITY_PREFIXES = new Set<string>(
	Object.values(coreUtils()).map(({ prefix }) => prefix),
);

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
			states: z
				.record(
					z
						.string()
						.regex(
							/^[a-z][a-z0-9-]*$/,
							"a state name is lower case letters, digits and dashes",
						)
						.refine((name) => !BUILT_IN_VARIANTS.has(name), {
							message: "a state name cannot reuse a built-in variant prefix",
						})
						.refine((name) => !UTILITY_PREFIXES.has(name), {
							message: "a state name cannot reuse a utility prefix",
						}),
					z.string().regex(/^[[:]/, "a state selector starts with [ or :"),
				)
				.optional(),
			fonts: z
				.record(
					z
						.string()
						.regex(
							/^[a-z][a-z0-9-]*$/,
							"a font name is lower case letters, digits and dashes",
						),
					z.string().min(1),
				)
				.optional(),
			keyframes: z
				.record(
					z
						.string()
						.regex(
							/^[a-z][a-z0-9-]*$/,
							"a keyframes name is lower case letters, digits and dashes",
						)
						.refine((name) => name !== "none", {
							message: "none is the built-in animation-name",
						}),
					z.string().min(1),
				)
				.optional(),
		})
		.optional(),
});

/**
 * Identity function that types a config object.
 *
 * @example
 * export default defineConfig({ source: ["./src/**\/*.tsx"], output: "./out.css" });
 */
export function defineConfig(config: Config): Config {
	return config;
}
