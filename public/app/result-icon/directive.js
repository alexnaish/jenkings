(function (component) {
    
    component.directive('resultIcon', function () {
        return {
            restrict: 'E',
            controller: 'ResultIconController',
            bindToController: true,
            controllerAs: 'ctrl',
            scope: {
                result: '='
            },
            templateUrl: 'app/result-icon/template.html'
        };
    });

    component.controller('ResultIconController', ['$scope', function () {

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
        
        var result = this.result.toLowerCase();
        
        this.colour = colourMap[result] || 'red';
        this.icon = iconMap[result] || 'fa-times';
        this.title = this.result;

    }]);

})(angular.module('result-icon', []));