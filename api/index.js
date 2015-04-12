var express = require('express'),
    mongoose = require('mongoose'),
    router = require('./router'),
    scheduler = require('./scheduler'),
    app = express(),
    port = process.env.PORT  || 1337;

app.use(express.static(__dirname + '/public'));

router.apply(app);

app.get('*', function(req, res, next) {
    res.send('Jenkings Root');
    res.end();
});

mongoose.connect(process.env.MONGO_URL);

//scheduler.run();

app.listen(port, function(error){
    if(error){
        console.error('Unable to bind to port: ', port, error);
    } else {
        console.log('listening on port: ', port);
    }
});