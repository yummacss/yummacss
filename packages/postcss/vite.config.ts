import { defineConfig } from "vite-plus";

export default defineConfig({
	pack: {
		dts: true,
		entry: ["src/index.ts"],
		clean: true,
		format: ["esm"],
	},
});
