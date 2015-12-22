(function (component) {
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
        listSpecificJob: function (jobId) {
            return $http.get('/api/jobs/id/' + jobId)
                .then(
                    function (response) {
                        return response.data[0];
                    },
                    function (httpError) {
                        throw {
                            status: httpError.status,
                            message: httpError.data.error
                        };
                    });
        }
    };

    return service;

}]);

} (angular.module('jobs.service', [])));