(function (component) {

    component.service("BranchService", ['$http', function ($http) {

        var service = {
            listBranches: function (branch) {
                return $http.get('/api/branches')
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (httpError) {
                            throw httpError.status + " : " + httpError.data;
                        });
            },
            listAllBranchRuns: function (branch) {
                return $http.get('/api/branches/' + branch + '/jobs')
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (httpError) {
                            throw httpError.status + " : " + httpError.data;
                        });
            },
            listSpecificBranchRuns: function (branch, jobName) {
                return $http.get('/api/branches/' + branch + '/jobs/' + jobName)
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

})(angular.module('branch.service', []));