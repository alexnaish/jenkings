(function (component) {
    component.controller('BranchController', ['$routeParams', 'StatsService', 'projects', 'jobs', '$scope', 'SocketIO', function ($routeParams, StatsService, projects, jobs, $scope, SocketIO) {
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

        function addOrReplace(array, data) {
            var replaced = false;
            for (var i = 0; i < array.length; i++) {
                if (array[i].jobName === data.jobName && array[i].project === data.project && array[i].shard === data.shard) {
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
        }

        SocketIO.bindTo($scope);

        SocketIO.on('jenkings:new-job', function (job) {
            if (job.branch === $scope.trackingBranch) {
                addOrReplace($scope.trackedJobs, job);
            }
        });

        SocketIO.on('jenkings:job-updated', function (data) {
            if (data.branch === $scope.trackingBranch) {
                addOrReplace($scope.trackedJobs, data);
            }
        });

    }]);
})(angular.module('branch.controller', []));