var api = require('./api');

module.exports = {

    apply: function (app) {
        app.route('/jobs')
            .get(api.listAllJobs)
            .post(api.createNewJobRun);

        app.route('/jobs/:name')
            .get(api.getJobInformation);

        app.route('/jobs/:name/:buildId')
            .get(api.getJobRunInformation)
            .delete(api.deleteJobRun);
    }

}
