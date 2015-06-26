var component = angular.module('jobs.config', ['ngRoute']);

component.config(function ($routeProvider) {
    $routeProvider
        .when('/job/:jobName/:buildId', {
            templateUrl: 'app/jobs/template.html',
            controller: 'JobsController',
            resolve: {}
        })
});
