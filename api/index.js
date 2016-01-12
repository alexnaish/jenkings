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
        return req.url === '/favicon.ico';
    }
}));
app.disable('x-powered-by');

router.apply(app);
app.get('/config', function (req, res, next) {
    res.json(config);
});
app.get('*', function (req, res, next) {
    res.status(404).json({
        error: '404 Fallback'
    });
    res.end();
});
