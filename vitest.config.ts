import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
	},
	resolve: {
		alias: {
			"@yummacss/api": path.resolve(__dirname, "./packages/api/src"),
			"@": path.resolve(__dirname, "./packages/api/src"),
		},
	},
});
