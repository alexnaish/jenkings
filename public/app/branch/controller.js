var component = angular.module('branch.controller', []);

component.controller("BranchController", ['$routeParams', 'BranchService', '$scope', function ($routeParams, BranchService, $scope) {
    console.log('loaded JobsController');

    $scope.trackingBranch = $routeParams.branchName || 'master';

    BranchService.listAllBranchRuns($scope.trackingBranch).then(function (data) {
        console.log('my branch runs:', data);
    });

}]);
