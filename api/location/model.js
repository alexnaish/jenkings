var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    urlTemplate: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Location', locationSchema);