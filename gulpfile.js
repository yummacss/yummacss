const { src, dest, series } = require("gulp");
const clean = require("gulp-clean-css");
const config = require("./yummacss.config.js");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));

function standardFile() {
  const scssFiles = [
    "src/index.scss",
    ...(config.capabilities.core ? ["./src/_core.scss"] : []),
  ];

  return src(scssFiles)
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("yumma.css"))
    .pipe(dest("dist"));
}

function minifiedFile() {
  return src("dist/yumma.css")
    .pipe(clean())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist"));
}

exports.standardFile = standardFile;
exports.minifiedFile = minifiedFile;

exports.default = series(standardFile, minifiedFile);
