const gulp = require("gulp");
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
const cssImport = require("postcss-import");
const cssnano = require("cssnano");
const notify = require("gulp-notify");
const rename = require("gulp-rename");

function css() {
  return gulp
    .src("./src/style.css")
    .pipe(
      postcss([
        cssImport(),
        postcssPresetEnv({
          stage: 1,
          features: {
            "nesting-rules": true,
          },
        }),
      ])
    )
    .pipe(gulp.dest("./docs/css/"))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./docs/css/"))
    .pipe(
      notify({
        message: "Your CSS is ready ♡",
      })
    );
}

function watch() {
  gulp.watch("./src/**/*.css", css);
}

const build = gulp.series(css, watch);

exports.css = css;
exports.watch = watch;
exports.default = build;
