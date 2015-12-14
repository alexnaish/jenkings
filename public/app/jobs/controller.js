(function (component) {

    component.controller("JobsController", ['$scope', 'JobService', '$routeParams', function ($scope, JobService, $routeParams) {
    console.log('loaded JobsController');

    JobService.listSpecificJob($routeParams.id).then(function (data) {
        console.log('my data', data);
        $scope.job = data;
    });
}]);

} (angular.module('jobs.controller', [])));