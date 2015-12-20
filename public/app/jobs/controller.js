(function (component) {

    component.controller("JobsController", ['$scope', 'job', function ($scope, job) {
    console.log('loaded JobsController');
    $scope.job = job;
}]);

} (angular.module('jobs.controller', [])));