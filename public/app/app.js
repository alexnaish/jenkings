var app = angular.module('Jenkings', [
  'sidebar', 'latest', 'branch', 'jobs', 'dropdown-menu', 'ngAnimate'
]);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/latest'
        })

    $locationProvider.html5Mode(false);
}]);