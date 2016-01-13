(function (component) {

    component.controller('LocationsController', ['$scope', 'locations', 'LocationService', 'SweetAlert', function ($scope, locations, LocationService, SweetAlert) {
        $scope.locations = locations;

        $scope.delete = function (locationItem) {
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this location!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                closeOnConfirm: false,
                closeOnCancel: true
            }, 
            function(isConfirm){ 
                if (isConfirm) {
                    LocationService.delete(locationItem).then(function () {
                        SweetAlert.swal('Deleted!', 'Location has been deleted.', 'success');
                        $scope.locations.splice(locationItem, 1);
                    });
                }
            });  
        };

    }]);

    component.controller('NewLocationController', ['$scope', 'LocationService', '$location', '$timeout', function ($scope, LocationService, $location, $timeout) {
        $scope.location = {};
        $scope.action = 'Create a';

        $scope.submit = function () {
            LocationService.create($scope.location).then(function () {
                $scope.alert = 'Successfully inserted. Redirecting back to list page in 2 seconds.';
                $timeout(function () {
                    $location.path('/locations');
                }, 2000);
            });
        };
    }]);


    component.controller('LocationController', ['$scope', 'location', 'LocationService', '$timeout', '$location', function ($scope, location, LocationService, $timeout, $location) {
        $scope.location = location;
        $scope.action = 'Editing';
        $scope.alert = null;

        $scope.submit = function () {
            LocationService.update($scope.location).then(function () {
                $scope.alert = 'Successfully updated. Redirecting back to list page in 2 seconds.';
                $timeout(function () {
                    delete $scope.alert;
                    $location.path('/locations');
                }, 2000);

            });
        };
    }]);

} (angular.module('locations.controller', [])));