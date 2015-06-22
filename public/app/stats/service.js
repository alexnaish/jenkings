var component = angular.module('stats.service', []);

component.service("StatsService", ['$http', function ($http) {

    var service = {
        getHistoricalStats: function (branch, parameters) {
            return $http.get('/api/stats/' + branch, {
                    params: parameters
                })
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
