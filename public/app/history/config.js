var component = angular.module('history.config', ['ngRoute']);

component.config(function ($routeProvider) {
    $routeProvider
        .when('/history', {
            templateUrl: 'app/history/template.html',
            controller: 'HistoryController',
            resolve: {
                config: function (ConfigService) {
                    return ConfigService.retrieveConfig();
                }
            }
        })
});
