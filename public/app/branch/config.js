var component = angular.module('branch.config', ['ngRoute']);

component.config(function ($routeProvider) {
    $routeProvider
        .when('/branch/:branchName', {
            templateUrl: 'app/branch/template.html',
            controller: 'BranchController',
            resolve: {}
        })
});