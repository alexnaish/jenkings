var JobService = require('../service/'),
    JenkinsService = require('../../jenkins/service');

module.exports = {

    listAllJobs: function (req, res, next) {
        JobService.find({}, {
            dateCreated: -1
        }, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    createNewJobRun: function (req, res, next) {
        JobService.create(req.body, function (statusCode, response) {
            if (statusCode === 201) {
                if (response.result === 'PENDING') {
                    console.log('pending job submitted');
                    JenkinsService.fetchAndPopulateJobRun(response.jobName, response.buildId, function (fetchStatusCode, fetchResponse) {
                        console.log('pending job submitted');
                        if (fetchStatusCode === 200) {
                            console.log('pending job updated successfully');
                            req.io.emit('jenkings:new-job', fetchResponse.message);
                        }
                    });
                } else {
                    req.io.emit('jenkings:new-job', response);
                }
            }
            res.status(statusCode).json(response);
        });
    },

    getJobInformation: function (req, res, next) {
        JobService.findSpecific({
            jobName: req.params.name
        }, {
            dateCreated: -1
        }, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    getJobRunInformation: function (req, res, next) {
        JobService.findSpecific({
            jobName: req.params.name,
            buildId: req.params.buildId
        }, {}, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    deleteJobRun: function (req, res, next) {
        JobService.delete({
            jobName: req.params.name,
            buildId: req.params.buildId
        }, function (statusCode, response) {
            res.status(statusCode).json(response);
        });
    }


};
