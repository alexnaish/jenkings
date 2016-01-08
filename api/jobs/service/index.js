var JobRun = require('../model'),
    QueueService = require('../../queue/service/');

module.exports = {

    find: function (query, sortObject, callback) {
        JobRun.find(query, null, {
            sort: sortObject
        }).populate('location').exec(function (err, results) {
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
        }).populate('location').exec(function (err, results) {
            if (err) {
                return callback(500, err);
            }
            if (results && results.length === 0) {
                return callback(404, { error: 'Job not found.' });
            }
            callback(200, results);
        });
    },
    create: function (payload, callback) {
        if (payload.project) {
            payload.project = payload.project.toLowerCase();
        }
        new JobRun(payload).save(function (err, result) {
            console.log('payload', payload);
            console.log('result', result);
            if (err) {
                callback(403, {
                    name: err.name,
                    message: err.message
                });
            } else {
                QueueService.create('new-job', ['jenkings:new-job', result]);
                if (payload.result === 'PENDING') {
                    QueueService.create('pending-job', [result._id]);
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
    },
    buildUrl: function (job) {
        return job.location.urlTemplate.replace(/\{([a-z]*)\}/gi, function (_, param) {
            return job[param];
        });
    }
};
