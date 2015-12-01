var config = require('config'),
    api = require('./api/');

module.exports = {

    apply: function (app) {

        app.route(config.app.apiPath + '/stats/jobNames')
            .get(api.listAllJobNames);

        app.route(config.app.apiPath + '/stats/projects/:branch')
            .get(api.listAllProjectsByBranch);

        app.route(config.app.apiPath + '/stats/:branch/:job')
            .get(api.generateStats);

    }

};