(function (component) {

    component.config(function ($routeProvider) {
        $routeProvider
            .when('/job/:id', {
                templateUrl: 'app/jobs/template.html',
                controller: 'JobsController',
                resolve: {
                    job: function (JobService, $route) {
                        return JobService.listSpecificJob($route.current.params.id);
                    }
                }
            });
    });

} (angular.module('jobs.config', ['ngRoute'])));