var api = require('./api/');

module.exports = {

    apply: function (app) {
        app.route('/branches')
            .get(api.listAllBranches);

        app.route('/branches/:branch/jobs/')
            .get(api.getBranchRuns);

        app.route('/branches/:branch/jobs/:jobName')
            .get(api.getBranchJobRuns);

    }

}
