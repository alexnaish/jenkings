var config = require('config'),
    validation = require('../validation'),
    api = require('./api/');

module.exports = {

    apply: function (app) {

        app.route(config.app.apiPath + '/jenkins/fetch/:id')
            .get(
                validation.validateObjectId,
                api.fetchJobRunInfo
                );

        app.route(config.app.apiPath + '/jenkins/fetch/:id/testReport')
            .get(
                validation.validateObjectId,
                api.fetchJobRunTestReport
                );

    }

}
