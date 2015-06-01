var JobRun = require('./model');

module.exports = {

    find: function (query, sortObject, callback) {
        JobRun.find(query, null, {
            sort: sortObject
        }, function (err, results) {
            if (err) {
                console.log('JobRun find err', err, query);
                callback(500, null);
            } else {
                callback(200, results);
            }
        });
    },
    findSpecific: function (query, callback) {
        JobRun.find(query, function (err, results) {
            if (err) {
                console.log('JobRun findSpecific err', err, query);
                callback(500, null);
            } else {
                if (results && results.length === 0) {
                    callback(404, results);
                } else {
                    callback(200, results);
                }
            }
        });
    },
    create: function (payload, callback) {
        new JobRun(req.body).save(function (err, result) {
            if (err) {
                console.log('JobRun create err', err, payload);
                callback(403, null);
            } else {
                callback(201, result);
            }
        });
    },
    delete: function (query, callback) {
        JobRun.remove(query, function (err, count) {
            if (err) {
                console.log('JobRun delete err', err, query);
                callback(500, null);
            } else {
                callback(204, result);
            }
        });
    }
};
