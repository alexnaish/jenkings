var JobService = require('./service');

module.exports = {

    listAllJobs: function (req, res, next) {
        JobService.find({}, {
            dateCreated: -1
        }, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    getJobInformation: function (req, res, next) {
        JobService.find({
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
        }, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    createNewJobRun: function (req, res, next) {
        new JobRun(req.body).save(function (err, result) {
            if (err) {
                console.log('createNewJobRun err', err);
                res.status(403).json(err);
            } else {
                res.status(201).json(result);
            }
        });
    },

    deleteJobRun: function (req, res, next) {
        res.send(req.params);
        res.end();
    }


};
