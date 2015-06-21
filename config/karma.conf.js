module.exports = function (config) {
    config.set({

        basePath: '../',
        autoWatch: false,
        frameworks: ['mocha'],
        browsers: ['PhantomJS'],

        files: [
      "http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js",
      "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular.min.js",
      "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular-mocks.js",
      'public/app/**/*.js'
    ],

        reporters: ["progress"],
        colors: true,
        preprocessors: {},

        logLevel: config.LOG_INFO,

        client: {
            captureConsole: true,
            mocha: {
                bail: true
            }
        }
    });
};