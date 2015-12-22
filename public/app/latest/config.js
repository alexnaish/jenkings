(function (component) {
    component.config(function ($routeProvider) {
        $routeProvider
            .when('/latest', {
                templateUrl: 'app/latest/template.html',
                controller: 'LatestController',
                resolve: {
                    jobs: function (JobService) {
                        return JobService.listAllJobs();
                    }
                }
            });
    });
})(angular.module('latest.config', ['ngRoute']));
