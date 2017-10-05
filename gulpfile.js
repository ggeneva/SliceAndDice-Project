const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
// const concat = require('gulp-concat');
// const clean = require('gulp-clean');


gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/styles/'));
});

gulp.task('compile:js', () => {
    return gulp.src('./app/**/**/*.js')
            .pipe(babel({
                presets: ['env'],
            }))
            .pipe(gulp.dest('./build/js'));
});

gulp.task('minify:css', () => {
    return gulp.src('./app/styles/**/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./tmp/styles'));
});

gulp.task('minify:js', ['compile:js'], () => {
    return pump([
        gulp.src('./build/js/**/*.js'),
        uglify(),
        gulp.dest('./dist/scripts'),
    ]);
});

// Watch task
gulp.task('default', function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('./app/**/**/*.js', ['compile:js']);
});
