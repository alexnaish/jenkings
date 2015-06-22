var StatsService = require('../service/'),
    _ = require('lodash');

module.exports = {

    generateStats: function (req, res, next) {
        var queryParams = _.extend(req.query, req.params);
        StatsService.generateHistorical(queryParams, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};
