var express = require('express'),
    mongoose = require('mongoose'),
    router = require('./router'),
    app = express(),
    port = 1337;

app.use(express.static(__dirname + '/public'));

router.apply(app);

app.get('*', function(req, res, next) {
    res.send('Jenkings Root');
    res.end();
});

mongoose.connect('mongodb://iceberg:kernel@localhost/iceberg_development');

app.listen(port);