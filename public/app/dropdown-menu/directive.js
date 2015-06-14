angular.module('dropdown-menu', []).directive('dropdownMenu', function () {
    return {
        restrict: 'E',
        controller: 'DropdownController',
        scope: {
            text: '=',
            options: '=',
            isOpen: '@'
        },
        templateUrl: 'app/dropdown-menu/template.html'
    };
}).controller('DropdownController', ['$scope', function ($scope) {

    console.log('loaded DropdownController');

    $scope.isOpen = $scope.isOpen || false;
    $scope.toggleDropdown = function () {
        $scope.isOpen = !$scope.isOpen;
    };

    $scope.$on('$locationChangeSuccess', function () {
        $scope.isOpen = false;
    });

}]);;