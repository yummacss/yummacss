import { defineConfig } from "vite-plus";

export default defineConfig({
	pack: [
		{
			banner: { js: "#!/usr/bin/env node" },
			dts: false,
			entry: ["src/cli.ts"],
			format: ["esm"],
			target: "es2020",
		},
		{
			dts: true,
			entry: ["src/index.ts", "src/merge.ts"],
			format: ["esm"],
			target: "es2020",
		},
	],
});
