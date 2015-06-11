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
                request.get(generateJenkinsJobApiUrl(job, build), function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        try {
                            var bodyJson = JSON.parse(body);
                            JobService.update(queryObject, _.pick(bodyJson, ['result', 'builtOn', 'duration', 'culprits']), function (err, affectedRows) {
                                if (!err) {
                                    renderResponse(200, true, 'updated', callback);
                                } else {
                                    renderResponse(500, false, err, callback);
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
