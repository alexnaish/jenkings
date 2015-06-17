var JobRun = require('../model'),
    QueueService = require('../../queue/service/');

module.exports = {

    find: function (query, sortObject, callback) {
        JobRun.find(query, null, {
            sort: sortObject
        }, function (err, results) {
            if (err) {
                callback(500, err);
            } else {
                callback(200, results);
            }
        });
    },
    findSpecific: function (query, sortObject, callback) {
        JobRun.find(query, null, {
            sort: sortObject
        }, function (err, results) {
            if (err) {
                callback(500, err);
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
        new JobRun(payload).save(function (err, result) {
            if (err) {
                callback(403, {
                    name: err.name,
                    message: err.message
                });
            } else {
                QueueService.create('new-job', ['jenkings:new-job', result]);
                if (payload.result === 'PENDING') {
                    QueueService.create('pending-job', [result.jobName, result.buildId]);
                }
                callback(201, result);
            }
        });
    },
    update: function (query, payload, callback) {

        payload = payload && payload.toObject && payload.toObject() || payload;
        delete payload._id;

        JobRun.update(query, payload, {
            upsert: false
        }, function (err, affectedRows) {
            if (err) {
                callback(500, err);
            } else {
                callback(200, affectedRows);
            }
        });
    },
    delete: function (query, callback) {
        JobRun.remove(query, function (err, response) {
            if (err) {
                callback(500, err);
            } else {
                callback(204, {});
            }
        });
    }
};