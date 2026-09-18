import { defineConfig } from "tsdown";

// the old name keeps serving a working script tag, built from the cdn
// package's source so there is one copy of it
export default defineConfig({
	entry: ["../cdn/src/index.ts"],
	format: ["iife"],
	platform: "browser",
	clean: true,
	dts: false,
	minify: true,
	globalName: "yummacss",
	noExternal: [/@yummacss/],
});
