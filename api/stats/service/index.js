var JobRun = require('../../jobs/model');

module.exports = {

    generateHistorical: function (id, recordLimit, callback) {
        var limit = recordLimit || 5;

        JobRun.findOne({ _id: id }, function (err, result) {

            if (err) {
                callback(500, {
                    error: 'Error returned by database: ' + err.message
                });
            } if(!result){
                callback(404, {
                    error: 'No Job found with that ID.'
                });
            } else {

                var queryObject = {
                    jobName: result.jobName,
                    branch: result.branch,
                    shard: result.shard,
                    project: result.project,
                    dateCreated: { $lt: result.dateCreated },
                    result: { $ne: 'PENDING' }
                };

                JobRun.find(queryObject)
                    .sort({ 'dateCreated': -1 })
                    .select('result dateCreated')
                    .limit(limit)
                    .exec(function (err, result) {
                        if (err) {
                            callback(500, {
                                error: 'Error returned by database: ' + err.message
                            });
                        } else {
                            callback(200, result);
                        }
                    });
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
        JobRun.find({ branch: branch }).distinct('project', function (err, results) {
            if (err) {
                return callback(500, err);
            }
            callback(200, results);
        });
    }

};
