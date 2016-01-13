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

        $rootScope.$on('$routeChangeStart', function () {
            instance.displayed = true;
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            instance.displayed = false;
        });

        $rootScope.$on('$routeChangeError', function () {
            instance.displayed = false;
        });
    });

})(angular.module('loading', []));