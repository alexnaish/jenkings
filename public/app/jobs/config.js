var component = angular.module('jobs.config', ['ngRoute']);

component.config(function ($routeProvider) {
    $routeProvider
        .when('/latest', {
            templateUrl: 'app/jobs/template.html',
            controller: 'JobController',
            resolve: {}
        })
});
