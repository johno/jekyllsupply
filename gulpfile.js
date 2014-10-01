var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    rename  = require('gulp-rename'),
    cssmin  = require('gulp-minify-css'),
    concat  = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    prefix  = require('gulp-autoprefixer'),
    size    = require('gulp-size');

gulp.task('scss', function() {
  return gulp.src('scss/all.scss')
    .pipe(sass())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix())
    .pipe(rename('c.css'))
    .pipe(gulp.dest('css'))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'));
});

gulp.task('csslint', function() {
  gulp.src('css/c.css')
    .pipe(csslint({
      'compatible-vendor-prefixes': false,
      'box-sizing': false,
      'important': false,
      'known-properties': false
    }))
    .pipe(csslint.reporter());
});

gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['scss', 'csslint']);
});

gulp.task('default', ['scss', 'csslint', 'watch']);
