const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const ghPages = require("gulp-gh-pages");
const browserSync = require("browser-sync").create();

function copy_Html() {
  return gulp
    .src("source/*.html")
    .pipe(gulp.dest("public/"))
    .pipe(browserSync.stream());
}

function compile_Sass() {
  return gulp
    .src("source/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
}

function watchFn() {
  browserSync.init({
    server: {
      baseDir: "./public", // 指向虛擬伺服器需存取的資料夾
    },
  });
  gulp.watch("source/*.html", copy_Html);
  gulp.watch("source/scss/components/*.scss", compile_Sass);
}

function deploy() {
  return gulp.src("./public/**/*").pipe($.ghPages());
}

exports.default = gulp.series(deploy);
