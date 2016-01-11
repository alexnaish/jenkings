var config = require('config'),
    validation = require('../validation'),
    express = require('express'),
    api = require('./api/');

module.exports = {

    apply: function (app) {
        
        var router = express.Router();
        
        router.route('/locations')
            .get(api.listAllLocations)
            .post(api.createLocation);
        
        router.route('/locations/:id')
            .get(validation.validateObjectId, api.findLocation)
            .put(validation.validateObjectId, api.updateLocation);
            
        app.use(config.app.apiPath, router);
                    
    }

};