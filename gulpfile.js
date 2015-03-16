var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer');


var SRC = { 
  JS:           ['src/js/*.js'],
  EXTERNAL_JS:  ['src/js/external/*.js'],
  LESS:         ['src/less/style.less'],
  HTML:         ['src/*.html'],
  ASSETS:       ['src/assets/**/*']
};

var TARGET = "build";

// concatenate, minify, copy javascript
gulp.task('minify', function () {
 gulp.src( SRC.JS )
  .pipe( concat('main.js') )
  .pipe( gulp.dest(TARGET + '/js') )
}); 

// copy external javascript
gulp.task('externaljs', function () {
  return gulp.src( SRC.EXTERNAL_JS )
    .pipe( gulp.dest( TARGET +'/js/external') )
});

// copy assets
gulp.task('assets', function () {
  return gulp.src( SRC.ASSETS )
    .pipe( gulp.dest( TARGET +'/assets') )
});

// copy html
gulp.task('html', function () {
  return gulp.src( SRC.HTML )
    .pipe( gulp.dest( TARGET +'/') )
});

// compile less, minify css, copy
gulp.task('less', function() {
  return gulp.src( SRC.LESS )
    .pipe( less() )
    .pipe( autoprefixer({"browsers": ["> 1%", "ie >= 8"]}) )
    .pipe( minifyCSS() )
    .pipe( gulp.dest(TARGET + '/css') );
});

function notify ( event ) {
  console.log('\nFile ' + event.path + ' was ' + event.type + ', running tasks...\n')
}

gulp.task('watch', function () {
    gulp.watch( SRC.JS, ['minify'])
      .on('change', notify )
    gulp.watch( SRC.EXTERNAL_JS, ['externaljs'])
      .on('change', notify )
    gulp.watch( SRC.ASSETS, ['assets'])
      .on('change', notify )
    gulp.watch( ['src/less/**/*.less'], ['less'])
      .on('change', notify )
    gulp.watch( SRC.HTML, ['html'])
      .on('change', notify )
});

gulp.task('browser-sync', function () {
   var files = [
      TARGET + '/*.html',
      TARGET + '/css/*.css',
      TARGET + '/js/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './build'
      }
   });
});

gulp.task('default', ['minify', 'assets', 'html', 'externaljs', 'less', 'watch', 'browser-sync' ]);


