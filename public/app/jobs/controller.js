(function (component) {

    component.controller("JobsController", ['$scope', 'JobService', '$routeParams', function ($scope, JobService, $routeParams) {
    console.log('loaded JobsController');

    $scope.jobName = $routeParams.jobName;
    $scope.buildId = $routeParams.buildId;

    JobService.listSpecificJob($routeParams.jobName, $routeParams.buildId).then(function (data) {
        console.log('my data', data);
        $scope.job = data;
    });
}]);

} (angular.module('jobs.controller', [])));