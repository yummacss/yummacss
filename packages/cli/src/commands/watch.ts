import { watch as watchFiles } from "node:fs";
import { join, relative, resolve } from "node:path";
import { configName } from "@yummacss/nitro";
import picomatch from "picomatch";
import { m } from "../messages";
import { build, readConfig } from "../services/build";
import { fail, intro, say } from "../ui";

// the folder a glob starts in: "./src/**/*.tsx" watches "src"
export function base(pattern: string): string {
	const parts = pattern.replace(/^\.\//, "").split("/");
	const fixed = parts.slice(
		0,
		parts.findIndex((part) => /[*?{[]/.test(part)),
	);
	return fixed.join("/") || ".";
}

export async function watch(configPath?: string): Promise<number> {
	intro();

	let config: Awaited<ReturnType<typeof readConfig>>;
	try {
		config = await readConfig(configPath);
		const built = await build(config, configPath);
		say.done("scan", m.build.scanned(built.files, built.classes));
		say.done("write", m.build.written(built.output, built.bytes));
	} catch (error) {
		return fail(error);
	}

	const configFile = resolve(configPath ?? configName);
	let timer: NodeJS.Timeout | undefined;
	let changed = "";

	const rebuild = (file: string) => {
		changed = relative(process.cwd(), file).replace(/\\/g, "/");
		clearTimeout(timer);
		timer = setTimeout(async () => {
			try {
				if (resolve(file) === configFile) config = await readConfig(configPath);
				const built = await build(config, configPath);
				say.done(
					"rebuild",
					m.watch.rebuilt(changed, built.output, built.bytes, built.ms),
				);
			} catch (error) {
				say.error(
					"rebuild",
					m.watch.failed(
						error instanceof Error ? error.message : String(error),
					),
				);
			}
		}, 50);
	};

	const sources = (config.source ?? []).map((glob) =>
		glob.replace(/^\.\//, ""),
	);
	const isSource = picomatch(sources, { dot: true });
	for (const dir of new Set(sources.map(base))) {
		watchFiles(dir, { recursive: true }, (_event, name) => {
			if (!name) return;
			const file = join(dir, name);
			if (isSource(file.replace(/\\/g, "/"))) rebuild(file);
		});
	}
	watchFiles(configFile, () => rebuild(configFile));

	say.info("watch", m.watch.waiting);
	return new Promise(() => {});
}
