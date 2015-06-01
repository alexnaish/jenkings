var JobRun = require('./model');

module.exports = {

    find: function (query, sortObject, callback) {
        JobRun.find(query, null, {
            sort: sortObject
        }, function (err, results) {
            if (err) {
                console.log('listAllJobs err', err);
                callback(500, null);
            } else {
                callback(200, results);
            }
        });
    },
    findSpecific: function (query, callback) {
        JobRun.find(query, function (err, results) {
            if (err) {
                console.log('listAllJobs err', err);
                callback(500, null);
            } else {
                if (results && results.length === 0) {
                    callback(404, results);
                } else {
                    callback(200, results);
                }
            }
        });
    }


};
