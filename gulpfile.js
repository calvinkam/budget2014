var lr = require('tiny-lr');
var gulp = require('gulp');
var gulputil = require('gulp-util');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var less = require('gulp-less');
var bower = require('gulp-bower');

var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

var rjsConfig = require('./public/scripts/requirejsConfig');


var server = lr();
// gulp.task('default', function(){
//   // place code for your default task here
// });



var concatJs = function() {
    rjsConfig.baseUrl = "public/scripts";
    rjsConfig.out = 'concat.js';
    rjsConfig.name = "main";

    rjs(rjsConfig).pipe(uglify({
        outSourceMap: true
    }))
        .pipe(gulp.dest('./public/dist')); // pipe it to the output DIR
};
console.log(rjsConfig);
gulp.task('build', function() {
    gulp.src('less/*.less')
        .pipe(watch())
        .pipe(less())
        .pipe(gulp.dest('public/css/'));

    bower()
        .pipe(gulp.dest('public/bower_components/'));

    concatJs();
});


gulp.task('default', ['listen'], function() {
    gulp.src(['public/*', 'public/templates/*', 'public/scripts/*'])
        .pipe(watch())
        .pipe(livereload(server));

    gulp.src('less/*.less')
        .pipe(watch())
        .pipe(less())
        .pipe(gulp.dest('public/css/'))
        .pipe(livereload(server));

            concatJs();
});

gulp.task('listen', function(next) {
    server.listen(35729, function(err) {
        if (err) return console.error(err);
        next();
    });
});