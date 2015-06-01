var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    app;

gulp.task('mocha', function () {
    process.env.NODE_ENV = 'development';
    return gulp.src('./api/**/*.spec.js')
        .pipe(mocha({
            ui: 'bdd',
            reporter: 'spec',
            globals: {
                app: require('./api/index.js')
            }
        }))
        .once('end', function () {
            process.exit();
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
