(function (component) {

    component.directive('loading', function () {
        return {
            restrict: 'E',
            controller: 'LoadingController',
            bindToController: true,
            controllerAs: 'ctrl',
            templateUrl: 'app/loading/template.html'
        };
    });

    component.controller('LoadingController', function ($rootScope) {

        var instance = this;
        instance.displayed = true;

        $rootScope.$on('$routeChangeStart', function (e, current, prev) {
            instance.displayed = true;
        });
        $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
            instance.displayed = false;
        });

        $rootScope.$on('$routeChangeError', function (e, curr, prev, error) {
            instance.displayed = false;
        });
    });

})(angular.module('loading', []));