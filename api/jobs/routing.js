var config = require('config'),
    api = require('./api/');

module.exports = {

    apply: function (app) {
        app.route(config.app.apiPath + '/jobs')
            .get(api.listAllJobs)
            .post(api.createNewJobRun);

        app.route(config.app.apiPath + '/jobs/:name')
            .get(api.getJobInformation);

        app.route(config.app.apiPath + '/jobs/id/:id')
            .get(api.getJobRunInformation);
            // .delete(api.deleteJobRun);
    }

};