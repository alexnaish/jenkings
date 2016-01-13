var app = require('./index.js');
var port = process.env.PORT || 1337;
var scheduling = require('./scheduling');
var socketio = require('socket.io');
var sticky = require('sticky-session');
var cluster = require('cluster');

var server = app.listen(function () {
    if(cluster.isWorker){
        console.log('Worker %s (process ID: %s)', cluster.worker.id, cluster.worker.process.pid);
    }
});

if (!sticky.listen(server, port)) {
    // Master process
    server.once('listening', function () {
        console.log('my env:', process.env.NODE_ENV);
        console.log('Main Server on port: ', port);
    });
} else {
    var io = socketio(server);
    scheduling.start(io);
}