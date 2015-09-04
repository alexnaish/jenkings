var StatsService = require('../service/'),
    _ = require('lodash');

module.exports = {

    generateStats: function (req, res, next) {
        var limit = req.query.limit;
        StatsService.generateHistorical(req.params.branch, req.params.jobName, limit, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};
