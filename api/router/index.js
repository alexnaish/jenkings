var jobs = require('../jobs/routing');

module.exports = {
    
    apply: function(app) {
        jobs.apply(app);
    }
};