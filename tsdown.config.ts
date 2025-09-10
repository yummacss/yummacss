import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["cli/src/index.ts"],
  format: ["esm"],
  minify: true,
  target: "es2020",
});
