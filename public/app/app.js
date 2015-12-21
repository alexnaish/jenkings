(function (component) {
    component.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/latest'
            });

        $locationProvider.html5Mode(false);
    }]);

    component.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }]);

})(angular.module('Jenkings', [
    'loading', 'config', 'sidebar', 'latest', 'branch', 'jobs', 'stats', 'history', 'dropdown-menu', 'ngAnimate', 'chart.js'
]));