var component = angular.module('branch.controller', []);

component.controller("BranchController", ['$routeParams', 'BranchService', '$scope', function ($routeParams, BranchService, $scope) {
    console.log('loaded JobsController');

    console.log('$routeParams', $routeParams)

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
    }

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

    socket.on('jenkings:new-job', function (data) {
        if (data.branch === $scope.trackingBranch) {
            addOrReplace($scope.trackedJobs, 'jobName', data);
        }
    });

    socket.on('jenkings:job-updated', function (data) {
        if (data.branch === $scope.trackingBranch) {
            addOrReplace($scope.trackedJobs, 'jobName', data);
        }
    });

}]);
