var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var cssmin       = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './'
    });

    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
