(function (component) {

    component.directive('notification', function () {
        return {
            restrict: 'E',
            controller: 'NotificationController',
            bindToController: true,
            controllerAs: 'ctrl',
            replace: true,
            scope: {
                job: '=',
                idKey: '@',
                fetchHistory: '@'
            },
            templateUrl: 'app/notification/template.html'
        };
    });

    component.controller('NotificationController', function (StatsService) {

        var colourMap = {
            success: 'green',
            failure: 'red',
            unstable: 'red',
            pending: 'amber',
            aborted: 'grey'
        };

        var iconMap = {
            success: 'fa-check',
            failure: 'fa-times',
            unstable: 'fa-times',
            pending: 'fa-cog fa-spin',
            aborted: 'fa-exclamation'
        };

        var result = this.job.result.toLowerCase() || 'red';

        if(this.fetchHistory && !this.job.history) {
            StatsService.getHistoricalStats(this.job[this.idKey]).then(function(data){
                this.job.history = data;
            }.bind(this));
        }

        this.colour = colourMap[result];
        this.icon = iconMap[result] || 'fa-times';
    });

})(angular.module('notification', []));