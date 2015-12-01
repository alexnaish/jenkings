(function (component) {
    component.config(function ($routeProvider) {
        $routeProvider
            .when('/stats/:branchName', {
                templateUrl: 'app/stats/template.html',
                controller: 'StatsController',
                resolve: {
                    config: function (ConfigService) {
                        return ConfigService.retrieveConfig();
                    }
                }
            });
    });

})(angular.module('stats.config', ['ngRoute']));