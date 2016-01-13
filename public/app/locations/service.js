(function (component) {
    component.service('LocationService', ['$http', function ($http) {

        var service = {
            listAllLocations: function () {
                return $http.get('/api/locations')
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
            },
            findOne: function (locationId) {
                return $http.get('/api/locations/' + locationId)
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
            },
            create: function (data) {
                return $http.post('/api/locations', data)
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
            },
            update: function (data) {
                return $http.put('/api/locations/' + data._id, data)
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
            },
            delete: function (data) {
                return $http.delete('/api/locations/' + data._id)
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

} (angular.module('locations.service', [])));