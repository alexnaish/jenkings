module.exports = function (config) {
    config.set({

        basePath: '../',
        autoWatch: false,
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],

        files: [
      "http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js",
      "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.min.js",
      "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular-mocks.js",
      'public/app/**/*.js',
      'public/test/**/*.spec.js'
    ],

        reporters: ["spec"],
        colors: true,
        preprocessors: {},
        singleRun: true,

        logLevel: config.LOG_INFO,

        client: {
            captureConsole: true,
            mocha: {
                bail: true
            }
        }
    });
};