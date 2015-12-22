var config = require('config'),
    validation = require('../validation'),
    express = require('express'),
    api = require('./api/');

module.exports = {

    apply: function (app) {
        
        var router = express.Router();
        
        router.route('/jobs')
            .get(api.listAllJobs)
            .post(api.createNewJobRun);

        router.route('/jobs/:name')
            .get(api.getJobInformation);

        router.route('/jobs/id/:id')
            .get(
                validation.validateObjectId, 
                api.getJobRunInformation
            );           
            
        app.use(config.app.apiPath, router);
                    
    }

};