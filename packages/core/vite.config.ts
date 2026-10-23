import { defineConfig } from "vite-plus";

export default defineConfig({
	pack: {
		format: ["esm"],
		target: "es2020",
	},
});
