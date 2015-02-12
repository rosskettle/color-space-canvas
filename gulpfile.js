var gulp        = require('gulp');
var taskListing = require('gulp-task-listing');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var httpServer  = require('http-server');
var connect     = require('gulp-connect');
var open        = require('gulp-open');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var wrap        = require('shader-wrapper');

gulp.task('help', taskListing);

gulp.task('collate-shaders', function(cb) {
  var payload = {
    src:      './src/shaders/*.glsl',
    dest:     './src/shaders.js',
    header:   'ColorSpaceCanvas.Shaders = {\n',
    footer:   '\n}; if (typeof module !== \'undefined\') module.exports = ColorSpaceCanvas.Shaders;',
    complete: cb
  }
  wrap(payload);
});

gulp.task('build', ['collate-shaders','copy'], function() {
  console.log('build.......');
  return gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(concat('color-space-canvas.min.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('copy', function(){
  gulp.src('./src/*.js')
    .pipe(gulp.dest('./examples'));
});

gulp.task('connect', function() {
    connect.server({
    root: './examples',
    livereload: true
  });
});

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('html', function () {
  gulp.src('./examples/index.html')
    .pipe(connect.reload())
});

gulp.task('watch', function () {
  gulp.watch(['./src/**'], ['build','html']);
});

gulp.task("open", function(){
  var options = {
    url: "http://localhost:8080/index.html",
    app:"google chrome"

  };
  gulp.src("./examples/index.html")
  .pipe(open("", options));
});

gulp.task('default', ['build','connect', 'watch', 'open']);
