(function (component) {
    component.service('HistoryService', ['$http', function ($http) {

        var service = {
            fetchJobNames: function () {
                return $http.get('/api/stats/jobNames')
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (httpError) {
                            throw httpError.status + ' : ' + httpError.data;
                        });
            },
            listBuildsByName: function (jobName) {
                return $http.get('/api/jobs/' + jobName)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (httpError) {
                            throw httpError.status + ' : ' + httpError.data;
                        });
            }
        };

        return service;

    }]);
})(angular.module('history.service', []));