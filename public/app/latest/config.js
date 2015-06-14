var component = angular.module('latest.config', ['ngRoute']);

component.config(function ($routeProvider) {
    $routeProvider
        .when('/latest', {
            templateUrl: 'app/latest/template.html',
            controller: 'LatestController',
            resolve: {}
        })
});