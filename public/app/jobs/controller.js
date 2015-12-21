(function (component) {

    component.controller("JobsController", ['$scope', 'job', function ($scope, job) {
        $scope.job = job;

        $scope.data = [
            { x: 0, totalCount: 24, passCount: 14, failCount: 10 },
            { x: 1, totalCount: 8, passCount: 1, failCount: 7 },
            { x: 2, totalCount: 15, passCount: 11, failCount: 4 },
            { x: 3, totalCount: 160, passCount: 147, failCount: 13 },
            { x: 4, totalCount: 95, passCount: 87, failCount: 8 },
            { x: 5, totalCount: 52, passCount: 45, failCount: 7 }
        ];

        $scope.options = {
            axes: {
                x: { key: 'x' }
            },
            series: [
                { id: 'pass-count', y: 'passCount', label: 'Passes', axis: 'y', color: '69af76', type: 'column' },
                { id: 'fail-count', y: 'failCount', label: 'Failures', axis: 'y', color: 'de7171', type: 'column' }
            ],
            stacks: [{ axis: "y", series: ['pass-count', 'fail-count'] }],
            transition: { ease: 'sin', duration: 750, delay: 50 },
            drawLegend: false,
            tooltip: {
                formatter: function (x, y, series) {
                    return y + ' ' + series.label;
                }
            }
        };

    }]);

} (angular.module('jobs.controller', [])));