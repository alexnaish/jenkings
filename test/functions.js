var async = require('async'),
    config = require('config');

module.exports = {

    generateJenkinsJobApiUrl: function generateJenkinsJobApiPath(jobName, buildId) {
        return '/view/' + config.ci.view + '/job/' + jobName + '/' + buildId + '/api/json';
    },

    insertAssets: function (model, dataArray, finalCallback) {
        //Sort variables
        var asyncTasks = [];
        if (dataArray.constructor !== Array) {
            dataArray = [dataArray];
        }

        //Calculate function calls required
        dataArray.forEach(function (item) {
            asyncTasks.push(function (callback) {
                new model(item).save(callback);
            });
        });

        //Perform the async.parallel call
        async.parallel(asyncTasks, function () {
            finalCallback();
        });


    },

    removeAssets: function (model, query, finalCallback) {
        model.remove(query, function () {
            finalCallback();
        });
    }

};
