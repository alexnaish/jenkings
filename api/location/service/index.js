var LocationModel = require('../model');

module.exports = {

    find: function (query, callback) {
        LocationModel.find(query, callback);
    },

    findOne: function (query, callback) {
        LocationModel.findOne(query, callback);
    },

    create: function (payload, callback) {
        new LocationModel(payload).save(callback);
    },

    update: function (id, payload, callback) {

        var query = { _id: id };

        LocationModel.findOne(query, function (err, result) {
            if (err) {
                return callback({
                    status: 500,
                    message: err.message || "Find step of Update blew up."
                });
            }
            if (!result) {
                return callback({
                    status: 404,
                    message: 'No location found with that ID.'
                });
            }

            delete payload._id;
            LocationModel.update(query, payload, function () {
                if (err) {
                    return callback({
                        status: 500,
                        message: err.message || "Update step blew up."
                    });
                }
                callback(null, payload);
            });
        });
    },

    delete: function (id, callback) {
        LocationModel.remove({_id: id}, callback);
    }

};