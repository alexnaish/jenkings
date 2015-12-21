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

        $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
            if (curr.$$route && curr.$$route.resolve) {
                instance.displayed = true;
            }
        });
        $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
            instance.displayed = false;
        });

        $rootScope.$on('$routeChangeError', function (e, curr, prev, error) {
            instance.displayed = false;
            console.error('whoops', error);
        });
    });

})(angular.module('loading', []));