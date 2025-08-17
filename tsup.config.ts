import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["cli/src/**/*.ts"],
  format: ["esm"],
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
  outDir: "dist",
  target: "es2020",
});
