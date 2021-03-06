var config = require('config'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    router = require('./router');

module.exports = app;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function () {
  console.log('database connection connected');
});
db.once('open', function () {
    console.log('database connection established');
});
// When the connection is disconnected
db.on('disconnected', function () {
  console.log('database connection disconnected');
});
mongoose.connect('mongodb://' + config.mongo.user + ':' + config.mongo.pass + '@' + config.mongo.host + '/' + config.mongo.db);

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev', {
    skip: function (req) {
        return req.url === '/favicon.ico';
    }
}));
app.disable('x-powered-by');

router.apply(app);
app.get('/config', function (req, res) {
    res.json(config);
});
app.get('*', function (req, res) {
    res.status(404).json({
        error: '404 Fallback'
    });
    res.end();
});
