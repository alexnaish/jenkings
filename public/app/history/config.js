(function (component) {
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
            });
    });
})(angular.module('history.config', ['ngRoute']));