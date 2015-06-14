var config = require('config'),
    api = require('./api/');

module.exports = {

    apply: function (app) {
        app.route(config.app.apiPath + '/branches')
            .get(api.listAllBranches);

        app.route(config.app.apiPath + '/branches/:branch/jobs/')
            .get(api.getBranchRuns);

        app.route(config.app.apiPath + '/branches/:branch/jobs/:jobName')
            .get(api.getBranchJobRuns);

    }

}