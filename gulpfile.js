'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('dist', function () {
    gulp.src('src/*.js')
        .pipe(concat('odata.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('odata.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['dist']);
});

gulp.task('default', [
    'dist',
    'watch'
]);
