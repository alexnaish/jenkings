var JobRun = require('../../jobs/model');

module.exports = {

    generateHistorical: function (branch, job, callback) {
        var queryObject = {
            jobName: job,
            branch: branch,
            result: { $ne: 'PENDING' }
        };

        JobRun.find(queryObject)
            .sort({ 'dateCreated': -1 })
            .select('result')
            .limit(5).exec(function (err, result) {
                if (err) {
                    callback(500, err);
                } else {
                    callback(200, result);
                }
            });
    }

};
