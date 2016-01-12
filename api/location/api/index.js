var LocationService = require('../service/');

module.exports = {

    listAllLocations: function (req, res) {
        LocationService.find({}, function (err, results) {
            var status = 200, body = results;
            if (err) {
                status = 500;
                body = {
                    error: err.message || 'Something blew up.'
                };
            }

            res.status(status).json(body);
        });
    },

    findLocation: function (req, res) {
        var query = {
            _id: req.params.id
        };

        LocationService.findOne(query, function (err, result) {
            var status = 200, body = result;
            if (err) {
                status = 500;
                body = {
                    error: err.message || 'Something blew up.'
                };
            }
            if (!result) {
                status = 404;
                body = {
                    error: 'No location found'
                };
            }

            res.status(status).json(body);
        });
    },
    
    createLocation: function (req, res) {
        LocationService.create(req.body, function (err, result) {
            var status = 201, body = result;
            if (err) {
                status = 500;
                body = {
                    error: err.message || 'Something blew up.'
                };
            }

            res.status(status).json(body);
        });
    },
    
    updateLocation: function (req, res) {
        LocationService.update(req.params.id, req.body, function (err, result) {
            var status = 200, body = result;
            if (err) {
                status = 500;
                body = {
                    error: err.message || 'Something blew up.'
                };
            }

            res.status(status).json(body);
        });
    },
    
    deleteLocation: function (req, res) {
        LocationService.delete(req.params.id, function (err, result) {
            var status = 204, body = result;
            if (err) {
                status = 500;
                body = {
                    error: err.message || 'Something blew up.'
                };
            }
            res.status(status).json(body);
        });
    }

};
