var config = require('config'),
    request = require('request'),
    _ = require('lodash'),
    JobRun = require('../../jobs/model');

function generateJenkinsJobApiUrl(jobName, buildId) {
    return config.ci.domain + '/view/' + config.ci.view + '/job/' + jobName + '/' + buildId + '/api/json';
};

function updateJobRun(queryObject, originalData, retrievedData, callback) {

    var updatedModel = originalData;

    updatedModel.result = retrievedData.result;
    updatedModel.node = updatedModel.node || retrievedData.builtOn;
    updatedModel.duration = updatedModel.duration || retrievedData.duration;
    updatedModel.culprits = updatedModel.culprits || retrievedData.culprits;

    JobRun.update(queryObject, updatedModel, {
        upsert: false
    }, function (err, affectedRows) {

        console.log('originalData', originalData);
        console.log('retrievedData', retrievedData);
        console.log('updated', updatedModel);

        callback(err, updatedModel);
    });

};


module.exports = {

    fetchAndPopulateJobRun: function (job, build, callback) {
        var queryObject = {
            jobName: job,
            buildId: build
        };

        JobRun.findOne(queryObject, function (err, result) {
            result = result.toObject();
            if (result) {
                request(generateJenkinsJobApiUrl(job, build), function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        try {
                            var result = JSON.parse(body);
                            updateJobRun(queryObject, result, _.pick(result, ['result', 'builtOn', 'duration', 'culprits']), function (err, updatedModel) {
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
