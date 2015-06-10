var jobs = require('../jobs/routing'),
    branches = require('../branches/routing'),
    jenkins = require('../jenkins/routing');

module.exports = {

    apply: function (app) {
        jobs.apply(app);
        branches.apply(app);
        jenkins.apply(app);
    }
};
