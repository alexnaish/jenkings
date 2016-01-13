var StatsService = require('../service/');

module.exports = {

    generateStats: function (req, res) {
        var limit = req.query.limit || 5;
        StatsService.generateHistorical(req.params.id, limit, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },
    listAllJobNames: function (req, res) {
        StatsService.generateDistinctJobNames(function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },
    listAllProjectsByBranch: function (req, res) {
        StatsService.generateDistinctProjectsByBranch(req.params.branch, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};
