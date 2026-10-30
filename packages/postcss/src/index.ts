import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { type Config, generator, loadConfig, scan } from "@yummacss/nitro";
import postcss, { type AtRule, type PluginCreator, type Result } from "postcss";

/** Options for the PostCSS plugin. */
export interface Options {
	/** A config to use directly, instead of reading one from disk. */
	config?: Config;

	/** Path to a config file, when it is not `yummacss.config.mjs` beside `cwd`. */
	configPath?: string;

	/**
	 * Directory to resolve the config and the source globs from.
	 *
	 * @default process.cwd()
	 */
	cwd?: string;
}

const PLUGIN_NAME = "@yummacss/postcss";

let cache: { key: string; css: string } | null = null;

/**
 * Replaces the `@yummacss;` at-rule in a stylesheet with your generated CSS.
 *
 * @example
 * export default { plugins: { "@yummacss/postcss": {} } };
 */
const yummacss: PluginCreator<Options> = (options = {}) => ({
	postcssPlugin: PLUGIN_NAME,
	async Once(root, { result }) {
		const markers: AtRule[] = [];
		root.walkAtRules("yummacss", (atRule) => {
			markers.push(atRule);
		});

		if (markers.length === 0) return;

		const cwd = options.cwd ?? process.cwd();
		const { config, path: configPath } = await loadConfig({
			cwd,
			path: options.configPath,
			config: options.config,
		});
		const { classes, files } = await scan(config.source ?? [], { cwd });

		const key = createHash("sha1")
			.update(JSON.stringify(config))
			.update(Array.from(classes).sort().join(" "))
			.digest("hex");
		if (!cache || cache.key !== key) {
			cache = { key, css: generator(classes, config) };
		}

		for (const [index, marker] of markers.entries()) {
			if (index === 0) {
				const nodes = postcss.parse(cache.css, { from: result.opts.from });
				marker.replaceWith(nodes);
			} else {
				marker.remove();
			}
		}

		registerDependencies(result, config, files, configPath, cwd);
	},
});

yummacss.postcss = true;

function registerDependencies(
	result: Result,
	config: Config,
	files: string[],
	configPath: string | null,
	cwd: string,
) {
	const parent = result.opts.from;

	if (configPath) {
		result.messages.push({
			type: "dependency",
			plugin: PLUGIN_NAME,
			file: configPath,
			parent,
		});
	}

	for (const file of files) {
		result.messages.push({
			type: "dependency",
			plugin: PLUGIN_NAME,
			file,
			parent,
		});
	}

	for (const { dir, glob } of globDirDependencies(config.source ?? [], cwd)) {
		result.messages.push({
			type: "dir-dependency",
			plugin: PLUGIN_NAME,
			dir,
			glob,
			parent,
		});
	}
}

function globDirDependencies(
	patterns: string[],
	cwd: string,
): { dir: string; glob: string }[] {
	const dependencies = new Map<string, { dir: string; glob: string }>();

	for (const pattern of patterns) {
		if (!/[*?{}()[\]!]/.test(pattern)) continue;

		const segments = pattern.split(/[\\/]/);
		const staticSegments: string[] = [];
		while (
			segments.length > 0 &&
			segments[0] !== undefined &&
			!/[*?{}()[\]!]/.test(segments[0])
		) {
			staticSegments.push(segments[0]);
			segments.shift();
		}

		const dir = resolve(cwd, staticSegments.join("/"));
		const glob = segments.join("/") || "**/*";
		dependencies.set(`${dir}\0${glob}`, { dir, glob });
	}

	return Array.from(dependencies.values());
}

export default yummacss;
