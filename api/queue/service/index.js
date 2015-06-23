var QueuedRequest = require('../model'),
    _ = require('lodash');

module.exports = {

    create: function (identifier, params) {
        new QueuedRequest({
            identifier: identifier,
            parameters: params
        }).save();
    },

    process: function (identifier, functionContext, performFunction) {

        var QueueService = require('./');

        QueuedRequest.find({
            identifier: identifier,
            processed: false
        }, function (err, results) {
            console.log(new Date(), 'processing:', identifier, 'queue results', results.length);
            _.each(results, function (result) {
                performFunction.apply(functionContext, result.parameters);
                QueueService.finalise(result);
            });
        });
    },
    finalise: function finalise(queueObject) {
        QueuedRequest.update({
            _id: queueObject._id
        }, {
            processed: true
        }, {
            upsert: false
        }, function () {
            console.log('Finalising a queuedRequest', queueObject.identifier);
        });
    }


};