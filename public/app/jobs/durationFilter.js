(function (component) {
    component.filter('duration', function () {
        return function (duration) {
            var durationInSeconds = duration / 1000;
            return isNaN(durationInSeconds) || duration === null ? 'Unknown' : durationInSeconds + ' seconds';
        };
    });;

} (angular.module('jobs.filters', [])));