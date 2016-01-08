var config = require('config'),
    validation = require('../validation'),
    express = require('express'),
    api = require('./api/');

module.exports = {

    apply: function (app) {

        var router = express.Router();

        router.route('/jenkins/fetch/:id')
            .get(
                validation.validateObjectId,
                api.fetchJobRunInfo
                );

        router.route('/jenkins/fetch/:id/testReport')
            .get(
                validation.validateObjectId,
                api.fetchJobRunTestReport
                );

        app.use(config.app.apiPath, router);
    }

}
