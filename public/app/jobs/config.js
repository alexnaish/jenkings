(function (component) {

    component.config(function ($routeProvider) {
        $routeProvider
            .when('/job/:id', {
                templateUrl: 'app/jobs/template.html',
                controller: 'JobsController',
                resolve: {}
            });
    });

} (angular.module('jobs.config', ['ngRoute'])));