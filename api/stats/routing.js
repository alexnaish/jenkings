var config = require('config'),
    api = require('./api/');

module.exports = {

    apply: function (app) {

        app.route(config.app.apiPath + '/stats/jobNames')
            .get(api.listAllJobNames);

        app.route(config.app.apiPath + '/stats/:branch/:jobName')
            .get(api.generateStats);

    }

};