const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const plugins = require('gulp-load-plugins');
const plumber = require('gulp-plumber');

const $ = plugins();

gulp.task('configs', function() {
    gulp.src('public/configs/*.js')
        .pipe(plumber())
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
    gulp.src('public/scripts/**/*.js')
        .pipe(plumber())
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
    gulp.src('public/styles/main.css')
        .pipe(plumber())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('html', function() {
    gulp.src('public/index.html')
        .pipe(plumber())
        .pipe($.htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
     gulp.src('public/images/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('templates', function() {
    gulp.src('public/templates/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('fonts', function() {
    gulp.src('public/fonts/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build:dist',
['scripts', 'styles', 'templates', 'html', 'configs', 'fonts', 'images']);

