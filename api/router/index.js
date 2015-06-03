var jobs = require('../jobs/routing'),
    branches = require('../branches/routing');

module.exports = {

    apply: function (app) {
        jobs.apply(app);
        branches.apply(app);
    }
};
