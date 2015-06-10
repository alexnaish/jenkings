var config = require('config'),
    request = require('request'),
    _ = require('lodash'),
    JobRun = require('../../jobs/model');

function generateJenkinsJobApiUrl(jobName, buildId) {
    return config.ci.domain + '/view/' + config.ci.view + '/job/' + jobName + '/' + buildId + '/api/json';
}

module.exports = {

    fetchAndPopulateJobRun: function (job, build, callback) {
        JobRun.findOne({
            jobName: job,
            buildId: build
        }, function (err, result) {
            if (result) {
                request(generateJenkinsJobApiUrl(job, build), function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        try {
                            var result = JSON.parse(body);
                            callback(200, _.pick(result, ['result', 'builtOn', 'duration', 'culprits']));
                        } catch (exception) {
                            callback(500, {
                                result: 'borked',
                                error: exception
                            });
                        }
                    } else {
                        callback(404, {
                            message: 'Not found in CI. Maybe its dropped off?'
                        });
                    }
                });
            } else {
                callback(404, {
                    message: 'No jobrun found in Jenkings.'
                });
            }
        });
    }
};
