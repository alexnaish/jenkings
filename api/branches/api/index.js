var BranchService = require('../service/');

module.exports = {

    listAllBranches: function (req, res, next) {
        BranchService.findDistinct(function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    },

    getBranchJobRuns: function (req, res, next) {
        BranchService.find(req.params.branch, function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};
