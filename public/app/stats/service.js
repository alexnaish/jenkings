var component = angular.module('stats.service', []);

component.service("StatsService", ['$http', function ($http) {

    var service = {
        getHistoricalStats: function (branch) {
            return $http.get('/api/stats/' + branch)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (httpError) {
                        throw httpError.status + " : " + httpError.data;
                    });
        }
    };

    return service;

}]);
