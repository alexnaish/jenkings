var sidebar = angular.module('sidebar', []);


sidebar.controller("SidebarController", ['$scope', function ($scope) {
    console.log('loaded SidebarController');
    $scope.branchSwitcher = {
        text: 'Switch Branch',
        options: [{
            label: 'Master Branch',
            url: '#/branch/master'
        }, {
            label: 'Test Branch',
            url: '#/branch/test'
        }]
    };

}]);