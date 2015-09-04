var component = angular.module('branch.controller', []);

component.controller("BranchController", ['$routeParams', 'BranchService', 'StatsService', '$scope', function ($routeParams, BranchService, StatsService, $scope) {
    console.log('loaded JobsController');

    $scope.trackingBranch = $routeParams.branchName || 'master';
    $scope.displayAsList = true;

    if ($routeParams.desktopMode) {
        $scope.displayAsList = false;
    }

    BranchService.listAllBranchRuns($scope.trackingBranch).then(function (data) {
        $scope.trackedJobs = data;
    });

    $scope.toggleDisplayMode = function () {
        $scope.displayAsList = !$scope.displayAsList;
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
            StatsService.getHistoricalStats($scope.trackingBranch, job.jobName, 5).then(function(historicalData){
                console.log('heres my historical data!', job.jobName, historicalData);
                job.historical = historicalData;
            });
        }
    });

    socket.on('jenkings:job-updated', function (data) {
        if (data.branch === $scope.trackingBranch) {
            addOrReplace($scope.trackedJobs, 'jobName', data);
        }
    });

}]);
