const app = require('./index.js');
const port = process.env.PORT || 1337;
const scheduling = require('./scheduling');
const socketio = require('socket.io');
const sticky = require('sticky-session');
const cluster = require('cluster');

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