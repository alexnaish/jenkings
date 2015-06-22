var component = angular.module('stats.controller', ['']);

component.controller("StatsController", ['$scope', function ($scope) {
    console.log('loaded StatsController');
    $scope.loaded = true;

}]);
