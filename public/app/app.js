(function (component) {
    component.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/latest'
            })
            .otherwise(
                {
                    templateUrl: 'app/error/template.html',
                    controller: 'ErrorController'
                }
            );

        $locationProvider.html5Mode(false);
    }]);

    component.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }]);

    component.run(function($rootScope, $location){

        $rootScope.$on('$routeChangeError', function (e, curr, prev, error) {
            $location.path('/error').search(error);
        });
    });

})(angular.module('Jenkings', [
    'loading', 'error', 'config', 'sidebar', 'latest', 'branch', 'jobs', 'stats', 'history', 'dropdown-menu', 'ngAnimate', 'ng3-charts'
]));