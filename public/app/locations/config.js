(function (component) {

    component.config(function ($routeProvider) {
        $routeProvider
            .when('/locations', {
                templateUrl: 'app/locations/list.html',
                controller: 'LocationsController',
                resolve: {
                    locations: function (LocationService) {
                        return LocationService.listAllLocations();
                    }
                }
            })
            .when('/locations/:id', {
                templateUrl: 'app/locations/edit.html',
                controller: 'LocationController',
                resolve: {
                    location: function (LocationService, $route) {
                        return LocationService.findOne($route.current.params.id);
                    }
                }
            });
    });

} (angular.module('locations.config', ['ngRoute'])));