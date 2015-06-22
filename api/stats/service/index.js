var JobRun = require('../../jobs/model'),
    _ = require('lodash');

module.exports = {

    generateHistorical: function (branch, callback) {
        JobRun.aggregate([
            {
                $match: {
                    branch: branch,
                    result: {
                        $ne: 'PENDING'
                    }
                }
            }, {
                $group: {
                    _id: {
                        $dayOfYear: "$dateCreated"
                    },
                    result: {
                        $sum: 1
                    }
                }
            }
    ], function (err, result) {
            if (err) {
                callback(500, err);
            } else {
                callback(200, result);
            }
        });
    }

};
