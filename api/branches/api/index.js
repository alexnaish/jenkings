var BranchService = require('../service/');

module.exports = {

    listAllBranches: function (req, res) {
        BranchService.findDistinct(function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    getBranchRuns: function (req, res) {
        BranchService.findLatest(req.params.branch, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    getBranchJobRuns: function (req, res) {
        BranchService.find({
            branch: req.params.branch,
            jobName: req.params.jobName
        }, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};