describe('HistoryService', function() {

  var service;

  beforeEach(module('history.service'));

  beforeEach(inject(function(_HistoryService_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    service = _HistoryService_;
  }));

  it('should have a fetchJobNames function', function () {
    expect(angular.isFunction(service.fetchJobNames)).toBe(true);
  });

  it('should have a listBuildsByName function', function () {
    expect(angular.isFunction(service.listBuildsByName)).toBe(true);
  });


});