var JobService = require('../api/jobs/service'),
    async = require('async'),
    config = require('config');

module.exports = {

    generateJenkinsJobApiUrl: function generateJenkinsJobApiPath(job) {
        return JobService.buildUrl(job);
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
                new model(item).save(function(error, insertedDocument){      
                    if(error) {
                        // console.log('Errored item:', item);
                        throw error;
                    }
                    
                    var doc = insertedDocument.toObject();
                    doc._id = doc._id.toString();
                    callback(error, doc);
                });
            });
        });

        //Perform the async.parallel call
        async.parallel(asyncTasks, finalCallback);


    },

    removeAssets: function (model, query, finalCallback) {
        model.remove(query, function () {
            finalCallback();
        });
    }

};
