var api = require('./api/');

module.exports = {

    apply: function (app) {

        app.route('/jenkins/fetch/:job/:build')
            .get(api.fetchJobRunInfo);

    }

}
