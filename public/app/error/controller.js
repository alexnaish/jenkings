(function (component) {

    component.controller("ErrorController", ['$location', '$scope', function ($location, $scope) {
        $scope.status = $location.search().status || 'Error';
        $scope.message = $location.search().message || 'Something went wrong!';
    }]);

} (angular.module('error', [])));