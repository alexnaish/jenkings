var component = angular.module('latest.controller', ['jobs']);

component.controller("LatestController", ['$scope', 'JobService', function ($scope, JobService) {
    console.log('loaded LatestController');

    JobService.listAllJobs().then(function (data) {
        $scope.jobruns = data;
    });

    socket.on('jenkings:new-job', function (data) {
        $scope.jobruns.push(data);
        $scope.$digest();
    });

}]);