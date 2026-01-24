import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
	},
	resolve: {
		alias: {
			"@yummacss/core": path.resolve(__dirname, "./packages/core/src"),
			"@": path.resolve(__dirname, "./packages/core/src"),
		},
	},
});
