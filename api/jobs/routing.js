var jobsApi = require('./api');

module.exports = {

    apply: function (app) {
        
        
        //get info
        app.get('/jobs', jobsApi.listAllJobs);
        app.get('/jobs/:name', jobsApi.getJobInformation);
        app.get('/jobs/:name/:buildId', jobsApi.getJobRunInformation);
                
        
        //update info
        
        app.post('/jobs/:jobName', jobsApi.createNewJobRun);
        
        //delete 
        app.delete('/jobs/:jobName/:buildId', jobsApi.deleteJobRun);
    }
    
}