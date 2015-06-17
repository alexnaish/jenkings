var mongoose = require('mongoose');

var queueSchema = mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    parameters: [],
    processed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('QueuedRequest', queueSchema);