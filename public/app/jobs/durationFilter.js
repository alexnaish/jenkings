(function (component) {
    component.filter('duration', function () {
        return function (duration) {
            var durationInSeconds = duration / 1000;
            return isNaN(durationInSeconds) || duration === null ? 'Unknown' : '<strong>' + durationInSeconds + '</strong> seconds';
        };
    });;

} (angular.module('jobs.filters', [])));