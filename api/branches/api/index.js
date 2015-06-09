var BranchService = require('../service/');

module.exports = {

    listAllBranches: function (req, res, next) {
        BranchService.findDistinct(function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    getBranchRuns: function (req, res, next) {
        BranchService.find({
            branch: req.params.branch
        }, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    getBranchJobRuns: function (req, res, next) {
        BranchService.find({
            branch: req.params.branch,
            jobName: req.params.jobName
        }, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};
