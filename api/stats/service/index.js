var JobRun = require('../../jobs/model'),
    _ = require('lodash');

module.exports = {

    generateHistorical: function (branch, callback) {
        JobRun.aggregate([
            {
                $match: {
                    branch: 'master',
                    result: {
                        $ne: 'PENDING'
                    }
                }
            }, {
                $project: {
                    dateCreated: 1,
                    year: {
                        $year: "$dateCreated"
                    },
                    month: {
                        $month: "$dateCreated"
                    },
                    day: {
                        $dayOfMonth: "$dateCreated"
                    },
                    jobName: 1,
                    result: 1
                }
            }, {
                $project: {
                    date: {
                        $concat: [{
                            "$substr": ["$year", 0, 4]
                        }, ":", {
                            "$substr": ["$month", 0, 2]
                        }, ":", {
                            "$substr": ["$day", 0, 2]
                        }]
                    },
                    jobName: 1,
                    result: 1
                }
            }, {
                $group: {
                    _id: {
                        "date": "$date",
                        "jobName": "$jobName",
                        "result": "$result"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    date: "$_id.date",
                    jobName: "$_id.jobName",
                    result: "$_id.result",
                    count: "$count"
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
