var api = require('./api/');

module.exports = {

    apply: function (app) {
        app.route('/branches')
            .get(api.listAllBranches);
    }

}
