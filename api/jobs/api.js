var JobRun = require('./model');

module.exports = {
    
    listAllJobs: function (req, res, next) {
        JobRun.find(function(err, results){
            if(err) console.log('listAllJobs err', err);
            res.json(results);
        });
    },
    
    getJobInformation: function (req, res, next) {
        JobRun.find({jobName: req.params.name}, function(err, results){
            if(err) {
                console.log('getJobInformation err', err);
                res.status(500).json(err);
            } else {
                if(results && results.length > 0)
                res.status(200).json(results);
            }
        });
    },
    
    getJobRunInformation: function (req, res, next) {
        res.send(req.params);
        res.end();
    },
    
    createNewJobRun: function(req, res, next) {
        var job = new JobRun(req.body);

        job.save(function(err, result){
            if (err) {
                console.log('createNewJobRun err', err);
                res.status(403).json(err);
            } else {
                res.status(201).json({ message: 'Job Run Saved!', document: result });
            }
        });
    },
    
    deleteJobRun: function(req, res, next) {
        res.send(req.params);
        res.end();
    }
    
    
};
