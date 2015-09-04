var component = angular.module('stats.service', []);

component.service("StatsService", ['$http', function ($http) {

    var service = {
        getHistoricalStats: function (branch, jobName, limit) {
            return $http.get('/api/stats/' + branch + '/' + jobName + '?limit='+limit)
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
