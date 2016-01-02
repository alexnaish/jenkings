(function (component) {
    component.service("StatsService", ['$http', function ($http) {
        var service = {
            getHistoricalStats: function (id, limit) {
                return $http.get('/api/stats/history/' + id, {
                                params: { limit: limit }
                            }).then(
                        function (response) {
                            return response.data;
                        },
                        function (httpError) {
                           throw {
                                status: httpError.status,
                                message: httpError.data.error
                            };
                        });
            },

            getProjects: function(branch) {
                return $http.get('/api/stats/projects/' + branch)
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
})(angular.module('stats.service', []));