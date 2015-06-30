var config = require('config'),
    request = require('request'),
    _ = require('lodash'),
    JobRun = require('../../jobs/model'),
    QueueService = require('../../queue/service'),
    JobService = require('../../jobs/service');

function generateJenkinsJobApiUrl(jobName, buildId) {
    return config.ci.domain + '/view/' + config.ci.view + '/job/' + jobName + '/' + buildId + '/api/json';
};

function renderResponse(statusCode, successful, response, callback) {
    if (callback === undefined) {
        if (successful) {
            QueueService.create('job-updated', ['jenkings:job-updated', response]);
        }
    } else {
        callback(statusCode, response);
    }
};

module.exports = {

    fetchAndPopulateJobRun: function (job, build, callback) {
        var queryObject = {
            jobName: job,
            buildId: build
        };

        JobRun.findOne(queryObject, function (err, result) {
            if (result) {
                request.get(generateJenkinsJobApiUrl(job, build), function (error, response, body) {
                    if (!error && response && response.statusCode === 200) {
                        try {
                            var bodyJson = JSON.parse(body);

                            var payload = _.pick(bodyJson, ['result', 'builtOn', 'duration', 'culprits', 'artifacts', 'actions', 'changeSet']);
                            payload.node = payload.builtOn;
                            delete payload.builtOn;
                            payload.artifacts = _.pluck(payload.artifacts, 'relativePath');
                            if (payload.actions && payload.actions.length && payload.actions.length > 7) {
                                payload.runInfo = payload.actions[7];
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

    fetchAndReturnTestReport: function (job, build, callback) {
        callback(200, {
            result: 'tadadadada'
        });
    }
};
