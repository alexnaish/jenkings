var app = angular.module('Jenkings', [
  'config', 'sidebar', 'latest', 'branch', 'jobs', 'stats', 'history', 'dropdown-menu', 'ngAnimate', 'chart.js'
]);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/latest'
        })

    $locationProvider.html5Mode(false);
}]);
