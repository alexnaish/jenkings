var jobsApi = require('./api');

module.exports = {

    apply: function (app) {
        
        app.get('/jobs', jobsApi.listAllJobs);
        app.get('/jobs/:name', jobsApi.getJobInformation);
        app.get('/jobs/:name/:buildId', jobsApi.getJobRunInformation);
                
    }
    
}