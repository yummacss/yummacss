import gulp from "gulp";
const { series, src, dest } = gulp;
import clean from "gulp-clean-css";
import rename from "gulp-rename";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import debug from "gulp-debug";
import { config } from "./yummacss.config.js";

const { capabilities } = config;

function standardFile() {
  const entryPoint = capabilities.core
    ? "src/yummacss.scss"
    : "src/coreless.scss";

  return src(entryPoint)
    .pipe(debug({ title: "Processing File:" }))
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("yumma.css"))
    .pipe(dest("dist"));
}

function minifiedFile() {
  return src("dist/yumma.css", { allowEmpty: true })
    .pipe(debug({ title: "Minifying File:" }))
    .pipe(clean())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist"));
}

export const build = series(standardFile, minifiedFile);
