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
    },
    generateDistinctJobNames: function (callback) {
        JobRun.distinct('jobName', function (err, results) {
            if (err) {
                return callback(500, err);
            }
            callback(200, results);
        });
    },
    generateDistinctProjectsByBranch: function (branch, callback) {
        JobRun.find({branch: branch}).distinct('project', function (err, results) {
            if (err) {
                return callback(500, err);
            }
            callback(200, results);
        });
    }

};
