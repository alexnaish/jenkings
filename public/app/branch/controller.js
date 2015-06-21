var component = angular.module('branch.controller', []);

component.controller("BranchController", ['$routeParams', 'BranchService', '$scope', function ($routeParams, BranchService, $scope) {
    console.log('loaded JobsController');

    $scope.trackingBranch = $routeParams.branchName || 'master';
    BranchService.listAllBranchRuns($scope.trackingBranch).then(function (data) {
        $scope.trackedJobs = data;
    });

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

}]);