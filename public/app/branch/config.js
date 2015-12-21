(function (component) {
    component.config(function ($routeProvider) {
        $routeProvider
            .when('/branch/:branchName', {
                templateUrl: 'app/branch/template.html',
                controller: 'BranchController',
                resolve: {
                    projects: function (StatsService, $route) {
                        return StatsService.getProjects($route.current.params.branchName);
                    },
                    jobs: function (BranchService, $route) {
                        return BranchService.listAllBranchRuns($route.current.params.branchName);
                    }
                }
            });
    });
})(angular.module('branch.config', ['ngRoute']));