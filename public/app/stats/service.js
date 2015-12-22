(function (component) {
    component.service("StatsService", ['$http', function ($http) {
        var service = {
            getHistoricalStats: function (branch, jobName, limit) {
                return $http.get('/api/stats/' + branch + '/' + jobName + '?limit=' + limit)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (httpError) {
                            throw httpError.status + " : " + httpError.data;
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