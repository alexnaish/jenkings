var JobService = require('../service/'),
    QueueService = require('../../queue/service');

function generateResponse(res, statusCode, result) {
    res.status(statusCode).json(result);
};

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
            generateResponse(res, statusCode, response);
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
            _id: req.params.id
        }, {}, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    // Uncomment if required - not used right now
    // deleteJobRun: function (req, res, next) {
    //     JobService.delete({
    //         _id: req.params.id
    //     }, function (statusCode, response) {
    //         res.status(statusCode).json(response);
    //     });
    // }


};