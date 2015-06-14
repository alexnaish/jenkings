var config = require('config'),
    api = require('./api/');

module.exports = {

    apply: function (app, io) {
        app.route(config.app.apiPath + '/jobs')
            .get(api.listAllJobs)
            .post(function (req, res, next) {
                req.io = io;
                api.createNewJobRun(req, res, next);
            });

        app.route(config.app.apiPath + '/jobs/:name')
            .get(api.getJobInformation);

        app.route(config.app.apiPath + '/jobs/:name/:buildId')
            .get(api.getJobRunInformation)
            .delete(api.deleteJobRun);
    }

}