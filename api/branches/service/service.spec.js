var sinon = require('sinon'),
    BranchService = require('../service/'),
    JobRun = require('../../jobs/model'),
    expect = require('chai').expect;

describe('Branch Service', function () {

    describe('findDistinct function', function () {

        it('find will return a 200 and a flat array of branches', function (done) {
            sinon.stub(JobRun, 'find').yields(null, [{
                branch: 'test'
            }, {
                branch: 'another'
            }]);

            BranchService.findDistinct(function (statusCode, result) {
                expect(statusCode).to.be.equal(200);
                expect(result).to.be.length(2);
                expect(result).to.be.contain('test');
                expect(result).to.be.contain('another');

                JobRun.find.restore();
                done();
            });
        });

        it('find will return a 500 and an error object if an error occurs', function (done) {
            sinon.stub(JobRun, 'find').yields({
                name: 'MongooseError?',
                message: 'some message'
            }, null);

            BranchService.findDistinct(function (statusCode, result) {
                expect(statusCode).to.be.equal(500);

                JobRun.find.restore();
                done();
            });
        });

    });

});