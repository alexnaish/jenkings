var component = angular.module('stats.controller', ['chart.js']);

component.controller("StatsController", ['$scope', '$routeParams', 'StatsService', 'config', function ($scope, $routeParams, StatsService, config) {
    console.log('loaded StatsController');

    $scope.trackingBranch = $routeParams.branchName;

    StatsService.getHistoricalStats($scope.trackingBranch).then(function (data) {
        $scope.data = data;
    });

    $scope.jobs = config.ci.jobs;

}]);
