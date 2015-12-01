var StatsService = require('../service/'),
    _ = require('lodash');

module.exports = {

    generateStats: function (req, res, next) {
        var limit = req.query.limit;
        StatsService.generateHistorical(req.params.branch, req.params.job, limit, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },
    listAllJobNames: function (req, res, next) {
        StatsService.generateDistinctJobNames(function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },
    listAllProjectsByBranch: function (req, res, next) {
        StatsService.generateDistinctProjectsByBranch(req.params.branch, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};
