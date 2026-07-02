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

export interface Options {
	/**
	 * Inline configuration. When provided, no config file is read.
	 */
	config?: Config;

	/**
	 * Path to the config file, absolute or relative to the Vite root.
	 *
	 * @default "yumma.config.mjs"
	 */
	configPath?: string;
}

const MARKER = /@yummacss\s*;/;

export default function yummacss(options: Options = {}): Plugin {
	let config: Config;
	let root: string;
	let server: ViteDevServer | undefined;
	let cache: { key: string; css: string } | null = null;

	// CSS module ids that contain the @yummacss; marker, so source file
	// changes can trigger their re-transform.
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
		// Run before vite:css so the generated CSS flows through the
		// normal CSS pipeline.
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
					// reloadModule re-runs transform and emits a css-update,
					// swapping styles without a full page reload.
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

			// Covers `vite build --watch`; the dev server watcher already
			// tracks the project root.
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

			// Only the first marker receives the generated CSS; extras are
			// removed instead of duplicating the output.
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
