var component = angular.module('jobs.service', []);

component.service("JobService", ['$http', function ($http) {

    var service = {
        listAllJobs: function () {
            return $http.get('/api/jobs')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (httpError) {
                        throw httpError.status + " : " + httpError.data;
                    });
        },
        listSpecificJob: function (jobName, buildId) {
            return $http.get('/api/jobs/' + jobName + '/' + buildId)
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
