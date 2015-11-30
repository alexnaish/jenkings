var component = angular.module('stats.controller', []);

component.controller("StatsController", ['$scope', '$routeParams', 'StatsService', 'config', function ($scope, $routeParams, StatsService, config) {
    console.log('loaded StatsController');

    $scope.trackingBranch = $routeParams.branchName;
    $scope.chartGenerated = false;

    StatsService.getHistoricalStats($scope.trackingBranch, {}).then(function (data) {
        $scope.data = data;
        $scope.chartGenerated = true;
    });

    $scope.jobs = config.ci.jobs;

    $scope.generateStats = function () {
        $scope.chartGenerated = false;
        StatsService.getHistoricalStats($scope.trackingBranch, {
            jobName: $scope.chosenJob
        }).then(function (data) {
            $scope.data = data;
            $scope.chartGenerated = true;
        });
    }

}]);
