import { existsSync, writeFileSync } from "node:fs";
import { configName } from "@yummacss/nitro";
import { m } from "../messages";
import { fail, intro, outro, say } from "../ui";

// the folders the classes live in, and a stylesheet next to them
export function configSource(cwd = process.cwd()): string {
	const dirs = existsSync(`${cwd}/src`)
		? ["src"]
		: ["app", "pages", "components"].filter((dir) =>
				existsSync(`${cwd}/${dir}`),
			);
	const globs = (dirs.length ? dirs : ["src"]).map(
		(dir) => `"./${dir}/**/*.{js,jsx,ts,tsx,mdx,html}"`,
	);
	const output = `./${dirs[0] ?? "src"}/styles.css`;

	return `import { defineConfig } from "yummacss";

export default defineConfig({
  source: [${globs.join(", ")}],
  output: "${output}",
});
`;
}

export function init(force = false): number {
	intro();
	if (existsSync(configName) && !force) {
		outro("next", m.init.exists(configName));
		return 0;
	}
	try {
		writeFileSync(configName, configSource());
		say.done("write", configName);
		outro("next", m.init.next());
		return 0;
	} catch (error) {
		return fail(error);
	}
}
