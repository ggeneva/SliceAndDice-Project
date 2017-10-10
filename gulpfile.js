/* global $ */

const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

gulp.task('configs', function() {
    gulp.src('app/configs/*.js')
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe($.minify({
            ext: {
                src: '.js',
                min: '.js',
            },
            noSource: {},
        }))
        .pipe(gulp.dest('dist/configs'));
});

gulp.task('scripts', function() {
    gulp.src('app/scripts/**/*.js')
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe($.minify({
            ext: {
                src: '.js',
                min: '.js',
            },
            noSource: {},
        }))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function() {
    gulp.src('app/styles/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('html', function() {
    gulp.src('app/index.html')
        .pipe($.htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
     gulp.src('app/images/*')
        .pipe($.imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('views', function() {
    gulp.src('app/views/**/*')
        .pipe(gulp.dest('dist/views'));
});

gulp.task('fonts', function() {
    gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build:dist',
['scripts', 'styles', 'views', 'html', 'configs', 'fonts', 'images']);


// Sass
gulp.task('styles-sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./tmp/app/styles/'));
});

// Watch task
gulp.task('default', function() {
    gulp.watch('./sass/**/*.scss', ['styles-sass']);
    gulp.watch('./app/**/**/*.js', ['compile:js']);
});
