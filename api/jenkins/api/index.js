var JenkinsService = require('../service/');

module.exports = {

    fetchJobRunInfo: function (req, res, next) {
        JenkinsService.fetchAndPopulateJobRun(req.params.id, function (status, body) {
            res.status(status).json(body);
        });
    },

    fetchJobRunTestReport: function (req, res, next) {
        JenkinsService.fetchAndReturnTestReport(req.params.id, function (status, body) {
            res.status(status).json(body);
        });
    }

};
