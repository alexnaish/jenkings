var sinon = require('sinon'),
    request = require('request'),
    JenkinsService = require('../service/'),
    JobRun = require('../../jobs/model'),
    JobService = require('../../jobs/service'),
    QueueService = require('../../queue/service'),
    testData = require('../../../test/data'),
    expect = require('chai').expect;

describe('Jenkins Service', function () {

    describe('fetchAndPopulateJobRun', function () {

        var updateStub,
            queueStub,
            requestStub,
            sandbox;

        beforeEach(function (done) {
            sandbox = sinon.sandbox.create();
            updateStub = sandbox.stub(JobService, 'update');
            queueStub = sandbox.stub(QueueService, 'create');
            requestStub = sandbox.stub(request, 'get');

            done();
        });

        afterEach(function () {
            sandbox.restore();
        });


        it('will return a 404 if no jobrun found in database', function (done) {
            JenkinsService.fetchAndPopulateJobRun('missing', function (statusCode, result) {
                expect(statusCode).to.be.equal(404);
                expect(result).to.have.property('message');
                expect(result.message).to.be.equal('No jobrun found in Jenkings.');
                done();
            });
        });

        it('will return a 404 if query is not found in jenkins', function (done) {
            
            sandbox.stub(JobService, 'findSpecific').yields(200, [{
                buildId: 123,
                jobName: 'test',
                location: {
                    urlTemplate: 'test'
                }
            }]);
            
            requestStub.yields(null, {
                statusCode: 404
            }, null);

            JenkinsService.fetchAndPopulateJobRun('found', function (statusCode, result) {
                expect(statusCode).to.be.equal(404);
                expect(result).to.have.property('message');
                expect(result.message).to.be.equal('Not found on CI. Maybe its dropped off?');
                done();
            });
        });

        it('will return a 500 if jenkins returns invalid json', function (done) {

            sandbox.stub(JobService, 'findSpecific').yields(200, [{
                buildId: 123,
                jobName: 'test',
                location: {
                    urlTemplate: 'test'
                }
            }]);

            requestStub.yields(null, {
                statusCode: 200
            }, 'invalid json');

            JenkinsService.fetchAndPopulateJobRun('found', function (statusCode, result) {
                expect(statusCode).to.be.equal(500);
                expect(result).to.have.property('message');
                done();
            });
        });

        it('will return a 500 if JobService update returns an error', function (done) {

            sandbox.stub(JobService, 'findSpecific').yields(200, [{
                buildId: 123,
                jobName: 'test',
                location: {
                    urlTemplate: 'test'
                }
            }]);

            requestStub.yields(null, {
                statusCode: 200
            }, JSON.stringify({
                builtOn: 'test',
                result: 'SUCCESSFUL'
            }));

            updateStub.yields(500, {
                message: 'some error'
            });

            JenkinsService.fetchAndPopulateJobRun('another', function (statusCode, result) {
                expect(statusCode).to.be.equal(500);
                expect(result).to.have.property('message');
                done();
            });
        });

        it('will return a 200 if results are found and there are no errors', function (done) {

            sandbox.stub(JobService, 'findSpecific').yields(200, [{
                buildId: 123,
                jobName: 'test',
                location: {
                    urlTemplate: 'test'
                }
            }]);

            requestStub.yields(null, {
                statusCode: 200
            }, testData.createJenkinsApiResponse('unstable', 'test1', 123));

            sandbox.stub(JobRun, 'findOne').yields(null, {
                _id: 'testidhere',
                jobName: 'test1',
                buildId: 2,
                result: 'SUCCESS'
            });

            updateStub.yields(200, {
                ok: 1,
                n: 1
            });

            JenkinsService.fetchAndPopulateJobRun('found', function (statusCode, result) {
                expect(statusCode).to.be.equal(200);
                expect(result).to.have.property('_id');
                expect(result).to.have.property('result');
                expect(result).to.have.property('jobName');
                expect(result).to.have.property('buildId');
                done();
            });
        });

        it('will create a job-update queue event if no callback is specified', function () {
            
            sandbox.stub(JobService, 'findSpecific').yields(200, [{
                buildId: 123,
                jobName: 'test',
                location: {
                    urlTemplate: 'test'
                }
            }]);
            
            requestStub.yields(null, {
                statusCode: 200
            }, JSON.stringify({
                builtOn: 'test',
                result: 'SUCCESS'
            }));

            sandbox.stub(JobRun, 'findOne').yields(null, {
                _id: 'testidhere',
                jobName: 'test1',
                buildId: 2,
                result: 'SUCCESS'
            });

            updateStub.yields(200, {
                ok: 1,
                n: 1
            });

            JenkinsService.fetchAndPopulateJobRun('found');

            expect(queueStub.called).to.be.equal(true);
            expect(queueStub.firstCall.args[0]).to.be.equal('job-updated');
            expect(queueStub.firstCall.args[1][0]).to.be.equal('jenkings:job-updated');
            expect(queueStub.firstCall.args[1][1]).to.have.property('_id');
        });

        it('will not create a job-update queue event if status is not successful even if no callback is specified', function () {

            sandbox.stub(JobService, 'findSpecific').yields(200, [{
                buildId: 123,
                jobName: 'test',
                location: {
                    urlTemplate: 'test'
                }
            }]);

            sandbox.stub(JobRun, 'findOne').withArgs({
                jobName: 'test1',
                buildId: 2
            }).yields({
                message: 'some error'
            }, null);

            JenkinsService.fetchAndPopulateJobRun('found');

            expect(queueStub.called).to.not.be.equal(true);

        });

    });
});