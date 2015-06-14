var app = angular.module('Jenkings', [
  'sidebar', 'latest', 'branch', 'jobs', 'dropdown-menu', 'ngAnimate'
]);

app.config(function ($locationProvider) {
    $locationProvider.html5Mode(false);
});