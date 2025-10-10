import { defineConfig } from "tsdown";

export default defineConfig({
	clean: true,
	dts: true,
	format: ["esm"],
	minify: true,
});
