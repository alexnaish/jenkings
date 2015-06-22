var StatsService = require('../service/');

module.exports = {

    generateStats: function (req, res, next) {
        StatsService.generateHistorical(req.params.branchName, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};
