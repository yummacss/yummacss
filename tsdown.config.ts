import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  entry: ["cli/src/index.ts"],
  format: ["esm"],
  minify: true,
  outDir: "dist",
  sourcemap: false,
  target: "es2020",
  unbundle: true,
});

