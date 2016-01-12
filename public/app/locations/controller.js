(function (component) {

    component.controller("LocationsController", ['$scope', 'locations', function ($scope, locations) {
        $scope.locations = locations;
    }]);
    
    component.controller("NewLocationController", ['$scope', 'LocationService', '$location', '$timeout', function ($scope, LocationService, $location, $timeout) {
        $scope.location = {};
        $scope.action = 'Create a';
        
        $scope.submit = function () { 
            LocationService.create($scope.location).then(function(){
                $scope.alert = 'Successfully inserted. Redirecting back to list page in 2 seconds.';
                $timeout(function(){
                    $location.path('/locations');
                }, 2000);
            });
        };
    }]);
    
    
    component.controller("LocationController", ['$scope', 'location', 'LocationService', '$timeout', '$location', function ($scope, location, LocationService, $timeout, $location) {
        $scope.location = location;
        $scope.action = 'Editing';
        $scope.alert = null;
        
        $scope.submit = function () {
            LocationService.update($scope.location).then(function(){
                $scope.alert = 'Successfully updated. Redirecting back to list page in 2 seconds.';
                $timeout(function(){
                    delete $scope.alert;
                    $location.path('/locations');
                }, 2000);
                
            });
        };
    }]);

} (angular.module('locations.controller', [])));