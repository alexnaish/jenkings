var sinon = require('sinon'),
    request = require('request'),
    JenkinsService = require('../service/'),
    JobRun = require('../../jobs/model'),
    JobService = require('../../jobs/service'),
    QueueService = require('../../queue/service'),
    expect = require('chai').expect;

describe('Jenkins Service', function () {

    describe('fetchAndPopulateJobRun', function () {

        var findStub,
            updateStub,
            queueStub,
            requestStub;

        beforeEach(function (done) {
            findStub = sinon.stub(JobRun, 'findOne');
            updateStub = sinon.stub(JobService, 'update');
            queueStub = sinon.stub(QueueService, 'create');
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

            done();
        });

        afterEach(function (done) {
            JobRun.findOne.restore();
            JobService.update.restore();
            request.get.restore();
            QueueService.create.restore();
            done();
        });

        it('will return a 404 if no jobrun found in database', function (done) {
            JenkinsService.fetchAndPopulateJobRun('missing', 1, function (statusCode, result) {
                expect(statusCode).to.be.equal(404);
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
                expect(result).to.have.property('message');
                done();
            });
        });

        it('will return a 500 if JobService update returns an error', function (done) {

            requestStub.yields(null, {
                statusCode: 200
            }, JSON.stringify({
                builtOn: 'test',
                result: 'SUCCESSFUL'
            }));

            updateStub.yields(500, {
                message: 'some error'
            });

            JenkinsService.fetchAndPopulateJobRun('test2', 3, function (statusCode, result) {
                expect(statusCode).to.be.equal(500);
                expect(result).to.have.property('message');
                done();
            });
        });

        it('will return a 200 if results are found and there are no errors', function (done) {

            requestStub.yields(null, {
                statusCode: 200
            }, JSON.stringify({
                builtOn: 'test',
                result: 'SUCCESS'
            }));

            findStub.withArgs({
                jobName: 'test1',
                buildId: 2
            }).onSecondCall().yields(null, {
                _id: 'testidhere',
                jobName: 'test1',
                buildId: 2,
                result: 'SUCCESS'
            });

            updateStub.yields(200, {
                ok: 1,
                n: 1
            });

            JenkinsService.fetchAndPopulateJobRun('test1', 2, function (statusCode, result) {
                expect(statusCode).to.be.equal(200);
                expect(result).to.have.property('_id');
                expect(result).to.have.property('result');
                expect(result).to.have.property('jobName');
                expect(result).to.have.property('buildId');
                done();
            });
        });

        it('will create a job-update queue event if no callback is specified', function () {

            requestStub.yields(null, {
                statusCode: 200
            }, JSON.stringify({
                builtOn: 'test',
                result: 'SUCCESS'
            }));

            findStub.withArgs({
                jobName: 'test1',
                buildId: 2
            }).onSecondCall().yields(null, {
                _id: 'testidhere',
                jobName: 'test1',
                buildId: 2,
                result: 'SUCCESS'
            });

            updateStub.yields(200, {
                ok: 1,
                n: 1
            });

            var result = JenkinsService.fetchAndPopulateJobRun('test1', 2);

            expect(queueStub.called).to.be.equal(true);
            expect(queueStub.firstCall.args[0]).to.be.equal('job-updated');
            expect(queueStub.firstCall.args[1][0]).to.be.equal('jenkings:job-updated');
            expect(queueStub.firstCall.args[1][1]).to.have.property('_id');
        });

        it('will not create a job-update queue event if status is not successful even if no callback is specified', function () {

            findStub.withArgs({
                jobName: 'test1',
                buildId: 2
            }).yields(null, null);

            var result = JenkinsService.fetchAndPopulateJobRun('test1', 2);

            expect(queueStub.called).to.not.be.equal(true);
        });

    });
});