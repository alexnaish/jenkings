var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    spawn = require('child_process').spawn,
    app;
 
gulp.task('test', function () {
    return gulp.src('api/*/*.spec.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('start-app', function() {

    if (app) {
        app.kill();
    }
    app = spawn('node', ['api/index.js'], {stdio: 'inherit'})
    app.on('close', function (code) {
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./api/**/*.js', ['start-app']);
});

gulp.task('default', ['start-app', 'watch']);

process.on('exit', function() {
    if (app) app.kill()
})
