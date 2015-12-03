describe('HistoryService', function () {

  var service;
  var $httpBackend;

  beforeEach(module('history.service'));
  beforeEach(inject(function (_HistoryService_, $injector) {
    service = _HistoryService_;
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a fetchJobNames function that returns a list of items', function () {
    expect(angular.isFunction(service.fetchJobNames)).toBe(true);

    var dummyData = ['oneJob', 'twoJob'];

    $httpBackend.when('GET', '/api/stats/jobNames')
      .respond(200, dummyData);

    var promise = service.fetchJobNames();
    $httpBackend.expectGET('/api/stats/jobNames');
    $httpBackend.flush();
    promise.then(function (result) {
      expect(result.length).toBe(dummyData.length);
      expect(result[0]).toBe(dummyData[0]);
      expect(result[1]).toBe(dummyData[1]);
    });

  });

  it('should have a listBuildsByName function that lists an array of jobs', function () {
    expect(angular.isFunction(service.listBuildsByName)).toBe(true);

    var testJob = 'alex-unit-test';
    var dummyData = [{
        jobName: testJob,
        buildId: 123
      },
      {
        jobName: testJob,
        buildId: 124
      }];

    $httpBackend.when('GET', '/api/jobs/'+testJob)
      .respond(200, dummyData);

    var promise = service.listBuildsByName(testJob);
    $httpBackend.expectGET('/api/jobs/'+testJob);
    $httpBackend.flush();
    promise.then(function (result) {
      expect(result.length).toBe(dummyData.length);
      expect(result[0]).toEqual(dummyData[0]);
      expect(result[1]).toEqual(dummyData[1]);
    });

  });


});