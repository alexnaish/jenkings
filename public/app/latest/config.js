(function (component) {
    component.config(function ($routeProvider) {
        $routeProvider
            .when('/latest', {
                templateUrl: 'app/latest/template.html',
                controller: 'LatestController',
                resolve: {}
            });
    });
})(angular.module('latest.config', ['ngRoute']));
