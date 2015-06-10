var JenkinsService = require('../service/');

module.exports = {

    fetchJobRunInfo: function (req, res, next) {
        JenkinsService.fetchAndPopulateJobRun(req.params.job, req.params.build, function (status, body) {
            res.status(status).json(body);
        });
    }

};
