import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["cli/src/index.ts"],
  unbundle: true,
  clean: true,
  format: ["esm"],
  minify: true,
  outDir: "dist",
  sourcemap: false,
  target: "es2020",
});

