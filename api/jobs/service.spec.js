var sinon = require('sinon'),
    JobService = require('./service'),
    JobRun = require('./model'),
    expect = require('chai').expect;

describe('Job Service', function () {

    describe('find functions', function () {

        var findStub;

        before(function () {
            findStub = sinon.stub(JobRun, 'find')

            findStub.withArgs({
                jobName: 'missing'
            }).yields(null, []);

            findStub.withArgs({}).yields(null, [{
                jobName: 'test1'
                }, {
                jobName: 'test2'
                }, {
                jobName: 'test3'
                }]);

            findStub.withArgs({
                jobName: 'test1'
            }).yields(null, [{
                jobName: 'test1'
            }]);

            findStub.withArgs({
                jobName: 'db.drop'
            }).yields({
                name: 'MongooseError?',
                message: 'some message'
            }, null);

        });

        after(function (done) {
            JobRun.find.restore();
            done();
        });

        it('find will return a 500 and an error object if an error occurs', function (done) {
            JobService.find({
                jobName: 'db.drop'
            }, {}, function (statusCode, result) {
                expect(statusCode).to.be.equal(500);
                expect(result).to.have.property('name');
                expect(result).to.have.property('message');
                done();
            });
        });

        it('find will return empty array if no results', function (done) {
            JobService.find({
                jobName: 'missing'
            }, {}, function (statusCode, result) {
                expect(statusCode).to.be.equal(200);
                expect(result).to.be.empty;
                done();
            });
        });

        it('find will return results if any match query', function (done) {
            JobService.find({}, {}, function (statusCode, result) {
                expect(statusCode).to.be.equal(200);
                expect(result).to.have.length(3);
                done();
            });
        });

        it('findSpecific will return a 500 and an error object if an error occurs', function (done) {
            JobService.findSpecific({
                jobName: 'db.drop'
            }, {}, function (statusCode, result) {
                expect(statusCode).to.be.equal(500);
                expect(result).to.have.property('name');
                expect(result).to.have.property('message');
                done();
            });
        });

        it('findSpecific will return a 404 if no results match query', function (done) {
            JobService.findSpecific({
                jobName: 'missing'
            }, {}, function (statusCode, result) {
                expect(statusCode).to.be.equal(404);
                expect(result).to.have.length(0);
                done();
            });
        });

        it('findSpecific will return a 200 and all results of query', function (done) {
            JobService.findSpecific({
                jobName: 'test1'
            }, {}, function (statusCode, result) {
                expect(statusCode).to.be.equal(200);
                expect(result).to.have.length(1);
                expect(result[0]).to.have.property('jobName');
                done();
            });
        });

    });

    describe('delete function', function () {

        var deleteStub;

        before(function () {
            deleteStub = sinon.stub(JobRun, 'remove');

            deleteStub.withArgs({
                jobName: 'a',
                buildId: 1
            }).yields(null, 1);

            deleteStub.withArgs({
                jobName: 'plz',
                buildId: 1
            }).yields({
                name: 'oops',
                message: 'mongoose error'
            }, null);
        });

        after(function (done) {
            JobRun.remove.restore();
            done();
        });

        it('delete will return a 204 and a json object containing the affected count', function (done) {
            JobService.delete({
                jobName: 'a',
                buildId: 1
            }, function (statusCode, result) {
                expect(statusCode).to.be.equal(204);
                expect(result.affected).to.be.equal(1);
                done();
            });
        });

        it('delete will return a 500 and an error object if there is an error', function (done) {
            JobService.delete({
                jobName: 'plz',
                buildId: 1
            }, function (statusCode, result) {
                expect(statusCode).to.be.equal(500);
                done();
            });
        });


    });

});