var JobRun = require('./model');

module.exports = {

    listAllJobs: function (req, res, next) {
        JobRun.find(function (err, results) {
            if (err) console.log('listAllJobs err', err);
            res.json(results);
        });
    },

    getJobInformation: function (req, res, next) {
        JobRun.find({
            jobName: req.params.name
        }, function (err, results) {
            if (err) {
                console.log('getJobInformation err', err);
                res.status(500).json(err);
            } else {
                res.status(200).json(results);
            }
        });
    },

    getJobRunInformation: function (req, res, next) {
        res.send(req.params);
        res.end();
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
