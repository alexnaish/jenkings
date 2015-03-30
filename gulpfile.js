var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    spawn = require('child_process').spawn,
    app;
 
gulp.task('test', function () {
    return gulp.src('api/*/*.spec.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('start-app', function(cb) {
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

gulp.task('default', function () {
    gulp.start('start-app');
    gulp.watch(['api/index.js', 'api/**/*.js'], function() {
        gulp.start('start-app');
    });
    
});

process.on('exit', function() {
    if (app) app.kill()
})