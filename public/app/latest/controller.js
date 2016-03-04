(function (component) {

    component.controller('LatestController', ['$scope', '$filter', 'jobs', 'SocketIO', function ($scope, $filter, jobs, SocketIO) {

        $scope.jobruns = generateJobList(jobs);

        SocketIO.bindTo($scope);

        SocketIO.on('jenkings:new-job', function (data) {
            console.log('new job received', data.jobName, data.buildId, data.result);
            $scope.jobruns.push(data);
            $scope.jobruns = generateJobList($scope.jobruns)
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

        function generateJobList(originalJobs) {
            var jobsToList = $filter('orderBy')(originalJobs, '-dateCreated');
            return $filter('limitTo')(jobsToList, 20);
        }

    }]);

})(angular.module('latest.controller', ['jobs']));
