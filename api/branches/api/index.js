var BranchService = require('../service/');

module.exports = {

    listAllBranches: function (req, res, next) {
        BranchService.findDistinct(function (statusCode, results) {
            res.status(statusCode).json(results);
        });
    }

};
