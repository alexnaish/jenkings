var JobRun = require('../../jobs/model');

module.exports = {

    generateHistorical: function (branch, job, recordLimit, callback) {
        var limit = recordLimit || 5;
        
        var queryObject = {
            jobName: job,
            branch: branch,
            result: { $ne: 'PENDING' }
        };

        var query = JobRun.find(queryObject)
            .sort({ 'dateCreated': -1 })
            .select('result dateCreated')
            .limit(limit)
            .exec(function (err, result) {
                if (err) {
                    callback(500, err);
                } else {
                    callback(200, result);
                }
            });
    }

};
