var sidebar = angular.module('sidebar', ['branch']);

sidebar.controller("SidebarController", ['$scope', 'BranchService', function ($scope, BranchService) {
    console.log('loaded SidebarController');

    $scope.branchSwitcher = {
        text: 'Switch Branch',
        urlPrefix: '#/branch/',
        options: []
    };

    BranchService.listBranches().then(function (data) {
        $scope.branchSwitcher.options = data;
    });

}]);