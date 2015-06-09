var JobRun = require('../../jobs/model'),
    _ = require('lodash');

module.exports = {

    find: function (branchName, callback) {
        JobRun.find({
            branch: branchName
        }, {}, {
            sort: {
                dateCreated: -1
            }
        }, function (err, results) {
            if (err) {
                callback(500, err);
            } else {
                callback(200, results);
            }
        });
    },

    findDistinct: function (callback) {
        JobRun.find({}, {
            branch: 1
        }, {
            sort: {
                dateCreated: -1
            }
        }, function (err, results) {
            if (err) {
                callback(500, err);
            } else {
                callback(200, _.uniq(_.pluck(results, 'branch')));
            }
        });
    }
};
