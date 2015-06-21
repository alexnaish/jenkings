var JobRun = require('../../jobs/model'),
    _ = require('lodash');

module.exports = {

    find: function (queryObject, callback) {
        JobRun.find(queryObject, {}, {
            sort: {
                dateCreated: -1
            }
        }, function (err, results) {
            if (err) {
                callback(500, err);
            } else {
                callback(200, results);
            }
        });
    },

    findLatest: function (branch, callback) {
        JobRun.aggregate([
            {
                $match: {
                    branch: branch
                }
            }, {
                $sort: {
                    dateCreated: -1
                }
            }, {
                $group: {
                    _id: '$jobName',
                    dateCreated: {
                        $first: '$dateCreated'
                    },
                    buildId: {
                        $first: '$buildId'
                    },
                    result: {
                        $first: '$result'
                    },
                    duration: {
                        $first: '$duration'
                    },
                    node: {
                        $first: '$node'
                    },
                    gitCommit: {
                        $first: '$gitCommit'
                    },
                    culprits: {
                        $first: '$culprits'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    jobName: '$_id',
                    buildId: 1,
                    dateCreated: 1,
                    result: 1,
                    duration: 1,
                    node: 1,
                    gitCommit: 1,
                    culprits: 1
                }
            }


    ], function (err, result) {
            if (err) {
                callback(500, err);
            } else {
                callback(200, result);
            }
        });

    },

    findDistinct: function (callback) {
        JobRun.find({}, {
            branch: 1
        }, {
            sort: {
                dateCreated: -1
            }
        }, function (err, results) {
            if (err) {
                callback(500, err);
            } else {
                callback(200, _.uniq(_.pluck(results, 'branch')));
            }
        });
    }
};