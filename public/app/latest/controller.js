var component = angular.module('latest.controller', ['jobs']);

component.controller("LatestController", ['$scope', 'JobService', function ($scope, JobService) {
    console.log('loaded LatestController');

    JobService.listAllJobs().then(function (data) {
        $scope.jobruns = data.slice(0, 20);
    });

    socket.on('jenkings:new-job', function (data) {

        console.log('new job received', data.jobName, data.buildId);

        $scope.$apply(function () {
            $scope.jobruns.push(data);
        });
    });

    socket.on('jenkings:job-updated', function (data) {
        console.log('job update received', data.jobName, data.buildId);
        for (var i = 0; i < $scope.jobruns.length; i++) {
            if ($scope.jobruns[i].jobName === data.jobName && $scope.jobruns[i].buildId === data.buildId) {
                $scope.$apply(function () {
                    $scope.jobruns[i] = data;
                });
                return;
            }
        }
    });
}]);
