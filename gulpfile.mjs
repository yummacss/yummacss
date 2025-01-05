import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import clean from "gulp-clean-css";
import debug from "gulp-debug";
import { config } from "./yummacss.config.js";
import { jsonFile } from "./apifile.js";

const { series, src, dest } = gulp;
const sass = gulpSass(dartSass);

const { capabilities } = config;

function standardFile() {
  const entryPoint = capabilities.core
    ? "src/yummacss.scss"
    : "src/coreless.scss";

  return src(entryPoint)
    .pipe(debug({ title: "Processing file:" }))
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("yumma.css"))
    .pipe(dest("dist"));
}

function minifiedFile() {
  return src("dist/yumma.css", { allowEmpty: true })
    .pipe(debug({ title: "Minifying file:" }))
    .pipe(clean())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist"));
}

export const build = series(standardFile, minifiedFile, jsonFile);
