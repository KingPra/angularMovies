/**
 * Purpose of a gulp file is to describe 'tasks'
 * that convert from 'developer mode' to 'productioin mode'. Things
 * like converting Sass => CSS, removing comments, merging
 * files, etc
 */

// Step 1: import gulp
const gulp = require('gulp');
const sass = require('gulp-sass');
const browser = require('gulp-browser');
const strip = require('gulp-strip-comments');

// Step 2: create default tasks
gulp.task('default', ['html', 'css', 'js']);

// Step 3: create subtasks
gulp.task('html', () => {
  return gulp.src('index.html')
    .pipe(strip.html())
    .pipe(gulp.dest('docs/'));
});

gulp.task('css', () => {
  // Convert style.scss into style.css
  // Copy to public/
  return gulp.src('scss/style.scss')
    .pipe(strip.text())
    .pipe(sass()) // requires gulp-sass
    .pipe(gulp.dest('docs/'));
});

gulp.task('js', () => {
  // Copy js file into public/
  return gulp.src('js/app.js')
    .pipe(browser.browserify()) // makes require work
    .pipe(strip())
    .pipe(gulp.dest('docs/'));
});

gulp.task('watch', ['default'], () => {
  // gulp.watch('files-to-watch', 'tasks-to-run')
  //gulp.watch('index.html',['html']); //watches a specific file 'index.html'
  gulp.watch('*.html', ['html']); //watches all html files
  gulp.watch('scss/*.scss', ['css']);
  gulp.watch('js/*.js', ['js']);
});
