var express = require('express'),
    mongoose = require('mongoose'),
    router = require('./router'),
    config = require('config'),
    app = express(),
    port = process.env.PORT  || 1337;

app.use(express.static(__dirname + '/public'));

router.apply(app);

app.get('/config', function(req, res, next) {
    res.json(config);
});

app.get('*', function(req, res, next) {
    res.send('Jenkings Root');
    res.end();
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});
mongoose.connect("mongodb://" +config.mongo.host);

console.log('my env:', process.env.NODE_ENV);

app.listen(port, function(error){
    if(error){
        console.error('Unable to bind to port: ', port, error);
    } else {
        console.log('listening on port: ', port);
    }
});

console.log('CWD: '+ process.cwd());
