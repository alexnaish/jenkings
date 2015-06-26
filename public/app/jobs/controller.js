var component = angular.module('jobs.controller', []);

component.controller("JobsController", ['$scope', 'JobService', '$routeParams', function ($scope, JobService, $routeParams) {
    console.log('loaded JobsController');

    JobService.listSpecificJob($routeParams.jobName, $routeParams.buildId).then(function (data) {
        $scope.job = data;
    });
}]);
