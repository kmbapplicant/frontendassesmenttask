// Gulp.js configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var folders = {
    source: 'src/',
    build: 'dist/'
};

gulp.task('sass', function () {
    return gulp.src(folders.source + 'styles/scss/*')
        .pipe(sass())
        .pipe(gulp.dest(folders.source + 'styles/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['sass', 'browserSync'], function () {
    gulp.watch(folders.source + 'styles/scss/*', ['sass']);
    gulp.watch(folders.source + '*.html', browserSync.reload);
    gulp.watch(folders.source + 'app/**/*.js', browserSync.reload);
    gulp.watch(folders.source + 'templates/**/*.html', browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: folders.source
        }
    })
});