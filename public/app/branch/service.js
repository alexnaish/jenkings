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
                            throw httpError;
                        });
            },
            listAllBranchRuns: function (branch) {
                return $http.get('/api/branches/' + branch + '/jobs')
                    .then(
                        function (response) {
                            return response.data;
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

})(angular.module('branch.service', []));