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
    project: {
        type: String,
        required: true
    },
    node: {
        type: String
    },
    shard: {
        type: Number
    },
    gitCommit: {
        type: String
    },
    culprits: {},
    duration: {
        type: Number
    },
    artifacts: {},
    runInfo: {},
    commitInfo: {}
});

jobSchema.index({
    jobName: 1,
    buildId: 1,
    project: 1,
    shard: 1
}, {
    unique: true
});

module.exports = mongoose.model('JobRun', jobSchema);
