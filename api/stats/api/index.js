var StatsService = require('../service/'),
    _ = require('lodash');

module.exports = {

    generateStats: function (req, res, next) {
        StatsService.generateHistorical(req.params.branch, req.params.jobName, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};
