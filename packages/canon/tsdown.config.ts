import { defineConfig } from "tsdown";

export default defineConfig({
	banner: { js: "#!/usr/bin/env node" },
	dts: true,
	entry: ["src/index.ts", "src/cli.ts"],
	clean: true,
	format: ["esm"],
	minify: true,
});
