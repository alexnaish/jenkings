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
        type: mongoose.Schema.Types.Array
    },
    duration: {
        type: String
    }
});

jobSchema.index({
    jobName: 1,
    buildId: 1
}, {
    unique: true
});

module.exports = mongoose.model('JobRun', jobSchema);