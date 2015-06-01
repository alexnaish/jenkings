var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    app;

gulp.task('mocha', function () {
    return gulp.src('./api/**/*.spec.js')
        .pipe(mocha({
            ui: 'bdd',
            reporter: 'nyan'
        }))
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            //process.exit();
        })
});

gulp.task('nodemon', function () {
    process.env.NODE_ENV = 'development';
    nodemon({
            script: "./api/index.js"
        })
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('watch', function () {
    gulp.watch('./api/**/*.js');
});

gulp.task('default', ['nodemon', 'watch']);
gulp.task('test', ['nodemon', 'mocha']);
