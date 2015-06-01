var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    job: {
        type: String
    },
    buildId: {
        type: String
    },
    dateCreated: {
        type: Date
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
