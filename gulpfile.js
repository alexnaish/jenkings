var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    karma = require('karma').server,
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

gulp.task('unit', function (done) {
    karma.start({
        configFile: __dirname + '/config/karma.conf.js'
    }, function () {
        done();
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

gulp.task('sass', function () {
    gulp.src('./sass/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('watch', function () {
    gulp.watch('./api/**/*.js');
});

gulp.task('default', ['nodemon', 'watch', 'sass:watch']);
gulp.task('test', ['mocha']);