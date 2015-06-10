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
    result: {
        type: String,
        default: 'PENDING'
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
    },
    culprits: {
        type: mongoose.Schema.Types.ObjectId
    },
    duration: {
        type: String
    }
});

module.exports = mongoose.model('JobRun', jobSchema);
