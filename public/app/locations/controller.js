(function (component) {

    component.controller("LocationsController", ['$scope', 'locations', function ($scope, locations) {
        $scope.locations = locations;
    }]);
    
    component.controller("LocationController", ['$scope', 'location', 'LocationService', '$timeout', function ($scope, location, LocationService, $timeout) {
        $scope.location = location;
        $scope.alert = null;
        
        $scope.submit = function () {
            LocationService.update($scope.location).then(function(){
                $scope.alert = 'Successfully updated.';
                $timeout(function(){
                    delete $scope.alert;
                }, 4000);
                
            });
        };
    }]);

} (angular.module('locations.controller', [])));