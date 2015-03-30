var express = require('express'),
    router = require('./router'),
    app = express(),
    port = 1337;

app.use(express.static(__dirname + '/public'));

router.apply(app);

app.get('*', function(req, res, next) {
    res.send('Jenkings Root');
    res.end();
});

app.listen(port);