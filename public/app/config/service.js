(function (component) {
    component.service("ConfigService", ['$http', function ($http) {

        var service = {
            retrieveConfig: function () {
                return $http.get('/config')
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
    
})(angular.module('config.service', []));