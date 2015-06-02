var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    nodemon = require('gulp-nodemon'),
    app;

gulp.task('mocha', function () {
    process.env.NODE_ENV = 'development';
    gulp.src(['./api/**/*.js', '!./api/**/*.spec.js', '!./api/index.js'])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src('./api/**/*.spec.js')
                .pipe(mocha({
                    ui: 'bdd',
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports({
                    reporters: ['html', 'text', 'text-summary']
                }))
                .pipe(istanbul.enforceThresholds({
                    thresholds: {
                        global: 85
                    }
                }))
                .once('end', function () {
                    process.exit();
                });
        });


});

gulp.task('nodemon', function () {
    process.env.NODE_ENV = 'development';
    nodemon({
            script: "./api/index.js",
            ignore: ['./api/**/*.spec.js']
        })
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('watch', function () {
    gulp.watch('./api/**/*.js');
});

gulp.task('default', ['nodemon', 'watch']);
gulp.task('test', ['mocha']);