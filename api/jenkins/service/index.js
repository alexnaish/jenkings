var request = require('request'),
    _ = require('lodash'),
    QueueService = require('../../queue/service'),
    JobRun = require('../../jobs/model'),
    JobService = require('../../jobs/service');

function renderResponse (statusCode, successful, response, callback) {
    if (callback === undefined) {
        if (successful) {
            QueueService.create('job-updated', ['jenkings:job-updated', response]);
        }
    } else {
        callback(statusCode, response);
    }
}

module.exports = {

    fetchAndPopulateJobRun: function (id, callback) {
        var queryObject = {
            _id: id
        };

        JobService.findSpecific(queryObject, {}, function (status, results) {
            if (status === 200) {
                var result = results[0];
                request.get(JobService.buildUrl(result), function (error, response, body) {
                    if (!error && response && response.statusCode === 200) {
                        try {
                            var bodyJson = JSON.parse(body);

                            var payload = _.pick(bodyJson, ['result', 'builtOn', 'duration', 'culprits', 'artifacts', 'actions', 'changeSet']);
                            payload.node = payload.builtOn;
                            delete payload.builtOn;
                            payload.artifacts = _.pluck(payload.artifacts, 'relativePath');
                            if (payload.actions && payload.actions.length && payload.actions.length > 7) {
                                //Fixes issue where buildsByBranchName contains a branch with a "." - Mongo doesn't allow keys with $ or . in them...
                                payload.runInfo = JSON.parse(JSON.stringify(payload.actions[7]).replace(/\./g, '_'));
                            } else {
                                payload.runInfo = {};
                            }
                            delete payload.actions;
                            if (payload.changeSet) payload.commitInfo = _.pluck(payload.changeSet.items, 'msg');
                            delete payload.changeSet;

                            JobService.update(queryObject, payload, function (status, response) {
                                if (status === 200) {
                                    JobRun.findOne(queryObject, function (err, finalResult) {
                                        renderResponse(200, true, finalResult, callback);
                                    });
                                } else {
                                    renderResponse(500, false, {
                                        message: response.message
                                    }, callback);
                                }
                            });
                        } catch (exception) {
                            renderResponse(500, false, exception, callback);
                        }
                    } else {
                        renderResponse(404, false, {
                            message: 'Not found on CI. Maybe its dropped off?'
                        }, callback);
                    }
                });
            } else {
                renderResponse(404, false, {
                    message: 'No jobrun found in Jenkings.'
                }, callback);
            }
        });
    },

    fetchAndReturnTestReport: function (id, callback) {
        callback(200, {
            result: 'tadadadada' + id
        });
    }
};
