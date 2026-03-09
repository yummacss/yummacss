import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: ["src/index.ts", "src/browser.ts"],
	clean: true,
	format: ["esm"],
	minify: true,
});
