(function (component) {

    component.controller("JobsController", ['$scope', 'job', function ($scope, job) {
        $scope.job = job;
    }]);

} (angular.module('jobs.controller', [])));