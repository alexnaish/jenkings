(function (component) {
    component.controller('SidebarController', ['$scope', 'BranchService', function ($scope, BranchService) {
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
})(angular.module('sidebar', ['branch']));