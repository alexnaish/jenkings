var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    jobName: {
        type: String,
        required: true
    },
    buildId: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    successful: {
        type: Boolean,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    node: {
        type: String
    },
    gitCommit: {
        type: String
    }
});

module.exports = mongoose.model('JobRun', jobSchema);
