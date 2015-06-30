var config = require('config'),
    api = require('./api/');

module.exports = {

    apply: function (app) {

        app.route(config.app.apiPath + '/jenkins/fetch/:job/:build/')
            .get(api.fetchJobRunInfo);

        app.route(config.app.apiPath + '/jenkins/fetch/:job/:build/testReport')
            .get(api.fetchJobRunTestReport);

    }

}
