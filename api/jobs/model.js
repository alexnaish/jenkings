var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    jobName: {
        type: String
    },
    buildId: {
        type: String
    },
    dateCreated: {
        type: Date, default: Date.now
    },
    successful: {
        type: Boolean
    },
    branch: {
        type: String
    },
    node: {
        type: String
    },
    gitCommit: {
        type: String
    }
});

module.exports = mongoose.model('JobRun', jobSchema);
