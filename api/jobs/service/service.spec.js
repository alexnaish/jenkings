var sinon = require('sinon'),
    JobService = require('../service/'),
    JobRun = require('../model'),
    expect = require('chai').expect;

describe('Job Service', function () {

    describe('find functions', function () {

        var findStub;

        before(function (done) {
            findStub = sinon.stub(JobRun, 'find');

            findStub.withArgs({
                jobName: 'missing'
            }).returns({
                populate: function () {
                    return {
                        exec: sinon.stub().yields(null, [])
                    };
                }
            });

            findStub.withArgs({}).returns({
                populate: function () {
                    return {
                        exec: sinon.stub().yields(null, [
                            {
                                jobName: 'test1'
                            },
                            {
                                jobName: 'test2'
                            },
                            {
                                jobName: 'test3'
                            }
                        ])
                    };
                }
            });

            findStub.withArgs({
                jobName: 'test1'
            }).returns({
                populate: function () {
                    return {
                        exec: sinon.stub().yields(null, [{
                            jobName: 'test1'
                        }])
                    };
                }
            });

            findStub.withArgs({
                jobName: 'db.drop'
            }).returns({
                populate: function () {
                    return {
                        exec: sinon.stub().yields({
                            name: 'MongooseError?',
                            message: 'some message'
                        }, null)
                    };
                }
            });
            
            done();
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
                expect(result).to.have.property('error', 'Job not found.');
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

    describe('update function', function () {

        var updateStub,
            payload = {
                _id: 'testId',
                node: 'test',
                duration: 1111
            },
            toObjectSpy = sinon.stub().returns(payload);

        beforeEach(function (done) {
            updateStub = sinon.stub(JobRun, 'update');
            done();
        });

        afterEach(function (done) {
            JobRun.update.restore();
            done();
        });

        it('should update the result and return the status code and the raw mongo update response', function (done) {

            updateStub.yields(null, {
                ok: 1,
                n: 1,
                nModified: 1
            });

            JobService.update({
                jobName: 'a',
                buildId: 1
            }, payload, function (statusCode, result) {

                var updateArgs = updateStub.args[0];
                //Query Argument
                expect(updateArgs[0].jobName).to.equal('a');
                expect(updateArgs[0].buildId).to.equal(1);

                //Update Argument
                expect(updateArgs[1]).to.not.have.property('_id');
                expect(updateArgs[1].node).to.equal('test');
                expect(updateArgs[1].duration).to.equal(1111);

                //Mongo Options
                expect(updateArgs[2].upsert).to.equal(false);

                expect(statusCode).to.be.equal(200);
                expect(result.n).to.be.equal(1);
                done();
            });

        });

        it('should call toObject if payload is a mongoose object', function (done) {

            updateStub.yields(null, {
                ok: 1,
                n: 1,
                nModified: 1
            });

            payload.toObject = toObjectSpy;

            JobService.update({
                jobName: 'a',
                buildId: 1
            }, payload, function (statusCode, result) {

                expect(toObjectSpy.called).to.equal(true);
                expect(statusCode).to.be.equal(200);
                expect(result.n).to.be.equal(1);
                done();
            });

        });

        it('should return a 500 statusCode and the error object if there was an error', function (done) {

            updateStub.yields({
                name: 'MongooseError?',
                message: 'some message'
            }, null);

            JobService.update({
                jobName: 'a',
                buildId: 1
            }, payload, function (statusCode, result) {

                expect(statusCode).to.be.equal(500);
                expect(result).to.have.property('name');
                expect(result).to.have.property('message');
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
                expect(Object.keys(result)).to.be.empty;
                done();
            });
        });

        it('delete will return a 500 and an error object if there is an error', function (done) {
            JobService.delete({
                jobName: 'plz',
                buildId: 1
            }, function (statusCode) {
                expect(statusCode).to.be.equal(500);
                done();
            });
        });

    });

    describe('buildUrl', function () {

        it('should build the correct url for jenkins', function () {

            var job = {
                location: {
                    urlTemplate: 'http://jenkins.com/view/myproject/job/{jobName}/{buildId}/api/json'
                },
                jobName: 'e2e',
                buildId: '123'
            };

            expect(JobService.buildUrl(job)).to.equal('http://jenkins.com/view/myproject/job/e2e/123/api/json');
        });

        it('should build the correct url for circle', function () {

            var job = {
                location: {
                    urlTemplate: 'https://circleci.com/api/v1/project/sky-uk/{jobName}/{buildId}'
                },
                jobName: 'e2e',
                buildId: '123'
            };

            expect(JobService.buildUrl(job)).to.equal('https://circleci.com/api/v1/project/sky-uk/e2e/123');
        });
    });

});