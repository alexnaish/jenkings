var config = require('config'),
    validation = require('../validation'),
    express = require('express'),
    api = require('./api/');

module.exports = {

    apply: function (app) {

        var router = express.Router();

        router.route('/stats/jobNames')
            .get(api.listAllJobNames);

        router.route('/stats/projects/:branch')
            .get(api.listAllProjectsByBranch);

        router.route('/stats/:id')
            .get(
                validation.validateObjectId,
                api.generateStats
            );

        app.use(config.app.apiPath, router);

    }

};