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
                idKey: '@'
            },
            templateUrl: 'app/notification/template.html'
        };
    });

    component.controller('NotificationController', ['StatsService', '$scope', function (StatsService, $scope) {
        // Me === :(
        var vm = this;

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

        $scope.$watch('ctrl.job.result', function(newValue, oldValue) {
           console.log('inside my watch', newValue, oldValue);
           if(newValue && newValue !== oldValue){
              setColourAndIcon(newValue);
           }
        });

        setColourAndIcon(vm.job.result);

        function setColourAndIcon(jobStatus) {
          jobStatus = jobStatus.toLowerCase()
          vm.colour = colourMap[jobStatus] || 'red';
          vm.icon = iconMap[jobStatus] || 'fa-times';
        }
    }]);

})(angular.module('notification', []));
