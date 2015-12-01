(function (component) {
    component.service("HistoryService", ['$http', function ($http) {

        var service = {
            listBuildsByName: function (jobName) {
                return $http.get('/api/jobs/' + jobName)
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
})(angular.module('history.service', []));