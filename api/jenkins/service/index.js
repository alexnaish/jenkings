var config = require('config'),
    request = require('request'),
    _ = require('lodash'),
    JobRun = require('../../jobs/model'),
    JobService = require('../../jobs/service');

function generateJenkinsJobApiUrl(jobName, buildId) {
    return config.ci.domain + '/view/' + config.ci.view + '/job/' + jobName + '/' + buildId + '/api/json';
};

function renderResponse(statusCode, successful, message, callback) {
    callback(statusCode, {
        successful: successful,
        message: message
    });
};

module.exports = {

    fetchAndPopulateJobRun: function (job, build, callback) {
        var queryObject = {
            jobName: job,
            buildId: build
        };

        JobRun.findOne(queryObject, function (err, result) {
            if (result) {

                console.log('querying:::::', generateJenkinsJobApiUrl(job, build));

                request.get(generateJenkinsJobApiUrl(job, build), function (error, response, body) {
                    if (!error && response && response.statusCode === 200) {
                        try {
                            var bodyJson = JSON.parse(body);
                            var payload = _.pick(bodyJson, ['result', 'builtOn', 'duration', 'culprits']);
                            payload.node = payload.builtOn;
                            delete payload.builtOn;

                            console.log('Jenkings result::::::', payload);

                            JobService.update(queryObject, payload, function (status, response) {
                                if (status === 200) {
                                    JobRun.findOne(queryObject, function (err, finalResult) {
                                        renderResponse(200, true, finalResult, callback);
                                    });
                                } else {
                                    renderResponse(500, false, response.message, callback);
                                }
                            });
                        } catch (exception) {
                            renderResponse(500, false, exception, callback);
                        }
                    } else {
                        renderResponse(404, false, 'Not found on CI. Maybe its dropped off?', callback);
                    }
                });
            } else {
                renderResponse(404, false, 'No jobrun found in Jenkings.', callback);
            }
        });
    }
};
