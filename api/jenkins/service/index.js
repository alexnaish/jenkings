var config = require('config'),
    request = require('request'),
    _ = require('lodash'),
    JobRun = require('../../jobs/model'),
    JobService = require('../../jobs/service');

function generateJenkinsJobApiUrl(jobName, buildId) {
    return config.ci.domain + '/view/' + config.ci.view + '/job/' + jobName + '/' + buildId + '/api/json';
};

function updateJobRun(queryObject, retrievedData, callback) {

    var updateData = {};

    updateData.result = retrievedData.result;
    updateData.culprits = retrievedData.culprits;
    updateData.node = retrievedData.builtOn;
    updateData.duration = retrievedData.duration;

    JobService.update(queryObject, updateData, function (err, affectedRows) {
        callback(err, updateData);
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
                request(generateJenkinsJobApiUrl(job, build), function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        try {
                            var bodyJson = JSON.parse(body);
                            updateJobRun(queryObject, _.pick(bodyJson, ['result', 'builtOn', 'duration', 'culprits']), function (err, updatedModel) {
                                callback(200, {
                                    successful: true,
                                    message: 'updated',
                                    result: updatedModel
                                });
                            });
                        } catch (exception) {
                            callback(500, {
                                successful: false,
                                message: 'borked',
                                error: exception
                            });
                        }
                    } else {
                        callback(404, {
                            successful: false,
                            message: 'Not found on CI. Maybe its dropped off?'
                        });
                    }
                });
            } else {
                callback(404, {
                    successful: false,
                    message: 'No jobrun found in Jenkings.'
                });
            }
        });
    }
};
