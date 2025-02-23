import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import clean from "gulp-clean-css";
import debug from "gulp-debug";

import { apiFile } from "./apifile.js";

const { series, src, dest } = gulp;
const sass = gulpSass(dartSass);

function buildStyles() {
  return src("src/yummacss.scss")
    .pipe(debug({ title: "Building styles:" }))
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("yumma.css"))
    .pipe(dest("dist"));
}

function minifyStyles() {
  return src("dist/yumma.css", { allowEmpty: true })
    .pipe(debug({ title: "Minifying styles:" }))
    .pipe(clean())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist"));
}

export const build = series(buildStyles, minifyStyles, apiFile);
