module.exports = {
    
    listAllJobs: function (req, res, next) {
        res.send('jobs api - listAllJobs');
        res.end();
    },
    
    getJobInformation: function (req, res, next) {
        res.send(req.params);
        res.end();
    },
    
    getJobRunInformation: function (req, res, next) {
        res.send(req.params);
        res.end();
    },
    
    createNewJobRun: function(req, res, next) {
        res.send(req.params);
        res.end();
    },
    
    deleteJobRun: function(req, res, next) {
        res.send(req.params);
        res.end();
    }
    
    
};