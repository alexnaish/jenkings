var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    urlTemplate: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Location', locationSchema);