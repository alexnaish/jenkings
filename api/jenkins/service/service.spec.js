var sinon = require('sinon'),
    request = require('request'),
    JenkinsService = require('../service/'),
    JobRun = require('../../jobs/model'),
    expect = require('chai').expect;

describe('Jenkins Service', function () {

    describe('fetchAndPopulateJobRun', function () {

        var findStub,
            updateStub,
            requestStub;

        beforeEach(function (done) {
            findStub = sinon.stub(JobRun, 'findOne');
            updateStub = sinon.stub(JobRun, 'update');
            requestStub = sinon.stub(request, 'get');

            findStub.withArgs({
                jobName: 'missing',
                buildId: 1
            }).yields(null, null);

            findStub.withArgs({
                jobName: 'test1',
                buildId: 2
            }).yields(null, {
                jobName: 'test1',
                buildId: 2
            });

            findStub.withArgs({
                jobName: 'test2',
                buildId: 3
            }).yields(null, {
                jobName: 'test2',
                buildId: 3
            });

            updateStub.withArgs({
                jobName: 'test2',
                buildId: 3
            }).yields({
                message: 'some error'
            }, null);

            done();
        });

        afterEach(function (done) {
            JobRun.findOne.restore();
            JobRun.update.restore();
            request.get.restore();
            done();
        });

        it('will return a 404 if no jobrun found in database', function (done) {
            JenkinsService.fetchAndPopulateJobRun('missing', 1, function (statusCode, result) {
                expect(statusCode).to.be.equal(404);
                expect(result).to.have.property('successful');
                expect(result.successful).to.be.equal(false);
                expect(result).to.have.property('message');
                expect(result.message).to.be.equal('No jobrun found in Jenkings.');
                done();
            });
        });

        it('will return a 404 if query is not found in jenkins', function (done) {

            requestStub.yields(null, {
                statusCode: 404
            }, null);

            JenkinsService.fetchAndPopulateJobRun('test1', 2, function (statusCode, result) {
                expect(statusCode).to.be.equal(404);
                expect(result).to.have.property('successful');
                expect(result.successful).to.be.equal(false);
                expect(result).to.have.property('message');
                expect(result.message).to.be.equal('Not found on CI. Maybe its dropped off?');
                done();
            });
        });

        it('will return a 500 if jenkins returns invalid json', function (done) {

            requestStub.yields(null, {
                statusCode: 200
            }, 'invalid json');

            JenkinsService.fetchAndPopulateJobRun('test1', 2, function (statusCode, result) {
                expect(statusCode).to.be.equal(500);
                expect(result).to.have.property('successful');
                expect(result.successful).to.be.equal(false);
                expect(result).to.have.property('message');
                done();
            });
        });

        it('will return a 500 if JobRun update fails', function (done) {

            requestStub.yields(null, {
                statusCode: 200
            }, {});

            JenkinsService.fetchAndPopulateJobRun('test2', 3, function (statusCode, result) {
                expect(statusCode).to.be.equal(500);
                expect(result).to.have.property('successful');
                expect(result.successful).to.be.equal(false);
                expect(result).to.have.property('message');
                done();
            });
        });

    });
});
