var JobRun = require('../../jobs/model'),
    _ = require('lodash');

module.exports = {

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
