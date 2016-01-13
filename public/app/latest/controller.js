(function (component) {

    component.controller('LatestController', ['$scope', 'jobs', 'SocketIO', function ($scope, jobs, SocketIO) {
        $scope.jobruns = jobs.slice(0, 20);

        SocketIO.bindTo($scope);

        SocketIO.on('jenkings:new-job', function (data) {
            console.log('new job received', data.jobName, data.buildId, data.result);
            $scope.jobruns.push(data);
        });

        SocketIO.on('jenkings:job-updated', function (data) {
            console.log('job update received', data.jobName, data.buildId, data.result);
            for (var i = 0; i < $scope.jobruns.length; i++) {
                if ($scope.jobruns[i].jobName === data.jobName && $scope.jobruns[i].buildId === data.buildId) {
                    $scope.jobruns[i] = data;
                    return;
                }
            }
        });
    }]);

})(angular.module('latest.controller', ['jobs']));