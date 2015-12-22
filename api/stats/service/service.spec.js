var sinon = require('sinon'),
    StatsService = require('./'),
    JobRun = require('../../jobs/model'),
    expect = require('chai').expect;

describe('Stats Service', function () {

	var sandbox;
	var testData = [
			'test1',
			'test2',
			'test3',
			'test4',
			'test5'
		];

	beforeEach(function(){
		sandbox = sinon.sandbox.create();
	});

	afterEach(function(){
		sandbox.restore();
	});

	it('generateDistinctJobNames will return a 200 and a flat array of jobNames', function (done) {
		sandbox.stub(JobRun, 'distinct').yields(null, testData);

		StatsService.generateDistinctJobNames(function (statusCode, result) {
			expect(statusCode).to.be.equal(200);
			expect(result).to.be.length(testData.length);
			expect(result).to.contain(testData[0]);
			expect(result).to.contain(testData[1]);
			done();
		});
	});

	it('generateDistinctJobNames will return a 500 and an error object if it blows up', function (done) {
		var error = {message: 'Some error!'};
		sandbox.stub(JobRun, 'distinct').yields(error, null);

		StatsService.generateDistinctJobNames(function (statusCode, result) {
			expect(statusCode).to.be.equal(500);
			expect(result).to.be.equal(error);
			done();
		});
	});


});