import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["cli/src/index.ts"],
  bundle: true,
  clean: true,
  format: ["esm"],
  minify: true,
  outDir: "dist",
  sourcemap: false,
  splitting: false,
  target: "es2020",
});
