var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sequence = require('gulp-sequence');
var html2js = require('gulp-html2js');

var htmlpath = 'build/app/html';
var jspath  = 'build/app/js';
var csspath = 'build/app/css';

gulp.task('html', function(){
    return gulp.src('src/static/html/*')
      .pipe(gulp.dest(htmlpath));
});

gulp.task('lib', function() {
  return gulp.src([
    'build/bower_components/jquery/dist/jquery.min.js',
    'build/bower_components/angular/angular.min.js',
    'build/bower_components/angular-route/angular-route.min.js', 
    'build/bower_components/angular-resource/angular-resource.min.js', 
    'build/bower_components/angular-sanitize/angular-sanitize.min.js',
    'build/bower_components/angular-cookies/angular-cookies.min.js',
    'build/bower_components/marked/marked.min.js',
    'build/bower_components/highlightjs/highlight.pack.js'
    ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(jspath));
});

gulp.task('app', function() {
  return gulp.src([
    'src/static/js/app.js',
    'src/static/js/router.js',
    'src/static/js/controllers.js',
    'src/static/js/directives.js',
    'src/static/js/filters.js',
    'src/static/js/services.js'
    ])
    .pipe(concat('app.js'))
    //.pipe(uglify())
    .pipe(gulp.dest(jspath));
});

gulp.task('tpl', function() {
  var base = 'src/static/tpl'
  return gulp.src(base + '/*.html')
    .pipe(html2js({
      outputModuleName: 'ngTemplate',
      useStrict: true,
      base: base
    }))
    .pipe(concat('template.js'))
    .pipe(gulp.dest(jspath))
});

gulp.task('css', function () {
  return gulp.src([
    'src/static/css/*.css',
    'build/bower_components/highlightjs/styles/atelier-cave.dark.css'
    ])
    .pipe(concat('app.css'))
    .pipe(gulp.dest(csspath));
});

gulp.task('default', sequence('html', 'lib', 'app', 'tpl', 'css'));