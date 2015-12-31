(function (component) {
    component.controller("BranchController", ['$routeParams', 'StatsService', 'projects', 'jobs', '$scope', function ($routeParams, StatsService, projects, jobs, $scope) {
        $scope.trackingBranch = $routeParams.branchName || 'master';
        $scope.history = {};
        $scope.displayMode = 'table';
        $scope.projects = projects;
        $scope.trackedJobs = jobs;

        if ($routeParams.desktopMode) {
            $scope.displayMode = 'desktop';
        }

        $scope.setDisplayMode = function (value) {

            switch (value) {
                case 'desktop':
                    $scope.displayMode = 'desktop';
                    break;
                case 'list':
                    $scope.displayMode = 'list';
                    break;
                case 'table':
                    $scope.displayMode = 'table';
                    break;
                default:
                    $scope.displayMode = 'table';
                    break;
            }
        };

        function addOrReplace(array, key, data) {
            var replaced = false;
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === data[key]) {
                    replaced = true;
                    $scope.$apply(function () {
                        array[i] = data;
                    });
                    return;
                }
            }
            if (!replaced) {
                $scope.$apply(function () {
                    array.push(data);
                });
            }
        };

        socket.on('jenkings:new-job', function (job) {
            if (job.branch === $scope.trackingBranch) {
                addOrReplace($scope.trackedJobs, 'jobName', job);
                // StatsService.getHistoricalStats($scope.trackingBranch, job.jobName, 5).then(function (historicalData) {
                //     $scope.history[job.jobName] = historicalData;
                // });
            }
        });

        socket.on('jenkings:job-updated', function (data) {
            if (data.branch === $scope.trackingBranch) {
                addOrReplace($scope.trackedJobs, 'jobName', data);
            }
        });

    }]);
})(angular.module('branch.controller', []));