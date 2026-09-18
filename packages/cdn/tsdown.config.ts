import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["iife"],
	platform: "browser",
	clean: true,
	dts: false,
	minify: true,
	globalName: "yummacss",
	noExternal: [/@yummacss/],
});
