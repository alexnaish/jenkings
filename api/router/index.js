var jobs = require('../jobs/routing'),
    branches = require('../branches/routing'),
    jenkins = require('../jenkins/routing'),
    locations = require('../location/routing'),
    stats = require('../stats/routing');

module.exports = {

    apply: function (app) {
        jobs.apply(app);
        branches.apply(app);
        jenkins.apply(app);
        locations.apply(app);
        stats.apply(app);
    }
};
