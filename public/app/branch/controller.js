var component = angular.module('branch.controller', []);

component.controller("BranchController", ['$routeParams', function ($routeParams) {
    console.log('loaded JobsController');
    console.log('tracking branch: ', $routeParams.branchName);


}]);