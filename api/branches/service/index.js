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
                    _id: {
                        jobName: '$jobName',
                        project: '$project',
                        shard: '$shard'
                    },
                    id: {
                        $first: '$_id'
                    },
                    jobName: {
                        $first: '$jobName'
                    },
                    project: {
                        $first: '$project'
                    },
                    shard: {
                        $first: '$shard'
                    },
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
                    id: 1,
                    jobName: 1,
                    project: 1,
                    shard: 1,
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