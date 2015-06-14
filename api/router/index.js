var jobs = require('../jobs/routing'),
    branches = require('../branches/routing'),
    jenkins = require('../jenkins/routing');

module.exports = {

    apply: function (app, io) {
        jobs.apply(app, io);
        branches.apply(app);
        jenkins.apply(app);
    }
};