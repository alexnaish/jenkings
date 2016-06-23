(function (component) {

    component.directive('jobHistory', function () {
        return {
            restrict: 'E',
            controller: 'JobHistoryController',
            bindToController: true,
            controllerAs: 'ctrl',
            scope: {
                job: '=',
                idKey: '@'
            },
            templateUrl: 'app/job-history/template.html'
        };
    });

    component.controller('JobHistoryController', ['StatsService', function (StatsService) {
        
        var vm = this;
        StatsService.getHistoricalStats(vm.job[this.idKey]).then(function(data){
            vm.history = data;
        });

    }]);

})(angular.module('jobHistory', []));
