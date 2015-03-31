var forEachAsync = require('forEachAsync'),
    request = require('request'),
    schedulerConfig = require('./config'),
    jenkinsHost = schedulerConfig.jenkinsHost + '{{jobName}}/api/json',
    jobsToMonitor = schedulerConfig.jobs;

module.exports = {

    run: function() {
        forEachAsync(jobsToMonitor, function(next, job) {
            var jobUrl = jenkinsHost.replace('{{jobName}}', job);
            console.log('Requesting: ', jobUrl);
            request(jobUrl, function(error, response, body) {
                
                if(!error && response.statusCode === 200){
                    var result = JSON.parse(body);
                    console.log('--------------------------');
                    console.log('my Job Name', result.name );
                    console.log('my Job Builds', result.builds );
                    console.log('--------------------------');
                } else {
                    console.log('There was an error!', response.statusCode);   
                }
                
                next();
            });
        }).then(function() {
            console.log("we're done!");
        });
    }

};
