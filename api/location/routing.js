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
            .all(validation.validateObjectId)
            .get(api.findLocation)
            .put(api.updateLocation)
            .delete(api.deleteLocation);
            
        app.use(config.app.apiPath, router);
                    
    }

};