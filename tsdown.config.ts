import { defineConfig } from "tsdown";

export default defineConfig({
  external: ["tinycolor2"],
  format: ["esm"],
  minify: true,
  target: "es2020",
});
