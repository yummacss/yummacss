import { createHash } from "node:crypto";
import { relative, resolve } from "node:path";
import {
	type Config,
	configName,
	generator,
	loadConfig,
	scan,
} from "@yummacss/nitro";
import picomatch from "picomatch";
import type { Plugin, ViteDevServer } from "vite";

/** Options for the Vite plugin. */
export interface Options {
	/** A config to use directly, instead of reading one from disk. */
	config?: Config;

	/** Path to a config file, when it is not `yumma.config.mjs` beside the root. */
	configPath?: string;
}

const MARKER = /@yummacss\s*;/;

/**
 * Generates your CSS at build time and replaces the `@yummacss;` marker in a
 * stylesheet with it. Rebuilds on a source or config change in dev.
 *
 * @example
 * export default defineConfig({ plugins: [yummacss()] });
 */
export default function yummacss(options: Options = {}): Plugin {
	let config: Config;
	let root: string;
	let server: ViteDevServer | undefined;
	let cache: { key: string; css: string } | null = null;

	const markerModules = new Set<string>();

	async function reloadConfig() {
		({ config } = await loadConfig({
			cwd: root,
			path: options.configPath,
			config: options.config,
		}));
	}

	function isSourceFile(file: string): boolean {
		const patterns = (config.source ?? []).map((pattern) =>
			pattern.replace(/^\.\//, ""),
		);
		const path = relative(root, file).replace(/\\/g, "/");
		return picomatch(patterns, { dot: true })(path);
	}

	return {
		name: "@yummacss/vite",
		enforce: "pre",

		async configResolved(viteConfig) {
			root = viteConfig.root;
			await reloadConfig();
		},

		configureServer(devServer) {
			server = devServer;
			const configFile = resolve(root, options.configPath ?? configName);

			devServer.watcher.on("all", async (event, file) => {
				if (event !== "add" && event !== "change" && event !== "unlink") {
					return;
				}

				if (resolve(file) === configFile) {
					await reloadConfig();
				} else if (!isSourceFile(file)) {
					return;
				}

				for (const id of markerModules) {
					const mod = devServer.moduleGraph.getModuleById(id);
					if (mod) devServer.reloadModule(mod);
				}
			});
		},

		async transform(code, id) {
			const file = id.split("?", 1)[0] ?? id;
			if (!file.endsWith(".css") || !MARKER.test(code)) return;

			markerModules.add(id);
			const { classes, files } = await scan(config.source ?? [], {
				cwd: root,
			});

			if (this.meta.watchMode && !server) {
				for (const f of files) {
					this.addWatchFile(f);
				}
			}

			const key = createHash("sha1")
				.update(JSON.stringify(config))
				.update(Array.from(classes).sort().join(" "))
				.digest("hex");
			if (!cache || cache.key !== key) {
				cache = { key, css: generator(classes, config) };
			}

			let replaced = false;
			const result = code.replace(new RegExp(MARKER, "g"), () => {
				if (replaced) return "";
				replaced = true;
				return cache?.css ?? "";
			});

			return { code: result, map: null };
		},
	};
}
