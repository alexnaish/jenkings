var config = require('config'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    router = require('./router'),
    port = process.env.PORT || 1337;

module.exports = app;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('database connection established');
});
mongoose.connect("mongodb://" + config.mongo.user + ":" + config.mongo.pass + "@" + config.mongo.host + "/" + config.mongo.db);

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev', {
    skip: function (req, res) {
        return req.url === '/favicon.ico'
    }
}));
app.disable('x-powered-by');

router.apply(app, io);
app.get('/config', function (req, res, next) {
    res.json(config);
});
app.get('*', function (req, res, next) {
    res.status(404).send('Jenkings Fallback 404');
    res.end();
});

console.log('my env:', process.env.NODE_ENV);
server.listen(port, function (error) {
    if (error) {
        console.error('Unable to bind to port: ', port, error);
    } else {
        console.log('listening on port: ', port);
    }
});