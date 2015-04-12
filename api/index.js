var express = require('express'),
    mongoose = require('mongoose'),
    router = require('./router'),
    scheduler = require('./scheduler'),
    app = express(),
    port = 1337;

app.use(express.static(__dirname + '/public'));

router.apply(app);

app.get('*', function(req, res, next) {
    res.send('Jenkings Root');
    res.end();
});

mongoose.connect('mongodb://jenkingsuser:jenkernel@jenkings-3492.mongo.dbs.appsdeck.eu:30310/jenkings-3492');

//scheduler.run();

app.listen(port);