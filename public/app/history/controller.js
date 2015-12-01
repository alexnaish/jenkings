(function (component) {
    component.controller("HistoryController", ['$scope', 'HistoryService', '$routeParams', 'config', function ($scope, HistoryService, $routeParams, config) {
        console.log('loaded HistoryController');

        $scope.builds = [];

        HistoryService.fetchJobNames().then(function(data){
            $scope.jobs = data;
        });
        
        $scope.generateStats = function () {
            HistoryService.listBuildsByName($scope.chosenJob).then(function (builds) {
                $scope.chartGenerated = true;
                $scope.builds = [300, 500, 100];
                $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            });
        };
    }]);

})(angular.module('history.controller', []));
