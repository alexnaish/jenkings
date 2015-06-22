var component = angular.module('stats.controller', ['chart.js']);

component.controller("StatsController", ['$scope', '$routeParams', 'StatsService', function ($scope, $routeParams, StatsService) {
    console.log('loaded StatsController');

    $scope.trackingBranch = $routeParams.branchName || 'master';

    StatsService.getHistoricalStats($scope.trackingBranch).then(function (data) {
        console.log('received:::', data);
    });

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.pieLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.pieData = [300, 500, 100, 40, 120];

}]);
