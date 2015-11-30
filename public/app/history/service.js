var component = angular.module('history.service', []);

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
        },
    };

    return service;

}]);
