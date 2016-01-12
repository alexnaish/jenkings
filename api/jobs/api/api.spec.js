var utils = require('../../../test/utils'),
    helpers = require('../../../test/functions'),
    app = require('../../index'),
    LocationModel = require('../../location/model'),
    JobModel = require('../model'),
    config = require('config'),
    nock = require('nock'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    QueueService = require('../../queue/service/'),
    request = require('supertest')(app);

describe('JobRun API', function () {

    var assets = [
        {
            jobName: 'test-run-1',
            buildId: '123',
            project: 'test',
            result: 'SUCCESS',
            branch: 'master'
        }, {
            jobName: 'test-run-1',
            buildId: '124',
            project: 'test',
            result: 'FAILURE',
            branch: 'test-branch'
        }, {
            jobName: 'test-run-2',
            buildId: '100',
            project: 'test',
            result: 'PENDING',
            branch: 'master'
        }, {
            jobName: 'delete-me',
            buildId: '1',
            project: 'test',
            result: 'SUCCESS',
            branch: 'master'
        }];

    var insertedAssets;

    var queueStub;

    var location = { name: 'test-jenkins', urlTemplate: 'http://jenkins.com/{jobName}/{buildId}' };

    before(function (done) {
        helpers.insertAssets(LocationModel, location, function(err, results){
            var insertedLocation = results[0];
          
            assets.map(function(asset){
                asset.location = insertedLocation._id;
                return asset;
            });
            
            done();
            
        });
    });

    before(function (done) {
        helpers.insertAssets(JobModel, assets, function (error, insertedDocuments) {
            insertedAssets = insertedDocuments;
            done();
        });
    });

    beforeEach(function (done) {
        queueStub = sinon.stub(QueueService, 'create');
        done();
    });

    afterEach(function (done) {
        QueueService.create.restore();
        done();
    });

    after(function (done) {
        helpers.removeAssets(JobModel, {}, function () {
            done();
        });
    });
    
    after(function (done) {
        helpers.removeAssets(LocationModel, {}, function () {
            done();
        });
    });

    describe('GET', function () {

        it('/jobs should return a 200 and list all job runs', function (done) {
            request.get('/api/jobs')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.length(assets.length);
                    done();
                });
        });

        it('/jobs/:name should return a 200 and list all job runs where jobName equals name', function (done) {
            request.get('/api/jobs/test-run-1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.length(2);
                    done();
                });
        });

        it('/jobs/id/:id should return a 200 and list one specific run', function (done) {
            var testObject = insertedAssets[0];
            request.get('/api/jobs/id/'+testObject._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.length(1);
                    expect(res.body[0].jobName).to.be.equal(testObject.jobName);
                    expect(res.body[0].buildId).to.be.equal(testObject.buildId);
                    expect(res.body[0].result).to.be.equal(testObject.result);
                    expect(res.body[0].branch).to.be.equal(testObject.branch);
                    done();
                });
        });

        it('/jobs/id/:jobId should return a 400 and json error object if ID is invalid', function (done) {
            request.get('/api/jobs/id/invalid-id')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.error).to.contain('Invalid ID');
                    done();
                });
        });

        it('/jobs/id/:jobId should return a 404 and json error object if no result returned', function (done) {
            request.get('/api/jobs/id/123456789123456789123123')
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.error).to.contain('Job not found');
                    done();
                });
        });

    });

    describe('POST', function () {

        it('/jobs should 403 if payload doesnt pass validation', function (done) {
            request.post('/api/jobs')
                .send({})
                .expect('Content-Type', /json/)
                .expect(403)
                .end(function (err, res) {

                    expect(queueStub.called).to.be.equal(false);
                    expect(res.body).to.be.have.property('name');
                    expect(res.body.name).to.be.contain('ValidationError');
                    expect(res.body).to.be.have.property('message');
                    expect(res.body.message).to.be.contain('validation');
                    done();
                });
        });

        it('/jobs should 201 and return document if payload passes validation and is stored', function (done) {

            var payload = {
                jobName: 'test',
                buildId: 1,
                branch: 'test',
                result: 'FAILURE',
                project: 'test',
                location: '123456123456123456123456'
            };

            request.post('/api/jobs')
                .send(payload)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {

                    expect(queueStub.calledOnce).to.be.equal(true);
                    expect(res.body).to.be.have.property('_id');
                    expect(res.body).to.be.have.property('jobName');
                    expect(res.body.jobName).to.be.equal('test');
                    expect(res.body).to.be.have.property('buildId');
                    expect(res.body.buildId).to.be.equal('1');
                    expect(res.body).to.be.have.property('result');
                    expect(res.body.result).to.be.equal('FAILURE');
                    expect(res.body).to.be.have.property('branch');
                    done();
                });
        });

        it('/jobs should 201 and create both events if job is pending', function (done) {

            var payload = {
                jobName: 'test',
                buildId: 2,
                branch: 'test',
                result: 'PENDING',
                project: 'test',
                location: '123456123456123456123456'
            };

            request.post('/api/jobs')
                .send(payload)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {

                    expect(queueStub.calledTwice).to.be.equal(true);

                    expect(queueStub.firstCall.args[0]).to.be.equal('new-job');
                    expect(queueStub.firstCall.args[1][0]).to.be.equal('jenkings:new-job');


                    expect(queueStub.secondCall.args[0]).to.be.equal('pending-job');

                    var queueFunctionArg = queueStub.secondCall.args[1][0].toString();
                    var objectIdRegex = /^[0-9a-fA-F]{24}$/;
                    //force the regex result to a boolean...
                    expect(!!queueFunctionArg.match(objectIdRegex)).to.be.equal(true);

                    expect(res.body).to.be.have.property('_id');
                    expect(res.body).to.be.have.property('jobName');
                    expect(res.body.jobName).to.be.equal('test');
                    expect(res.body).to.be.have.property('buildId');
                    expect(res.body.buildId).to.be.equal('2');
                    expect(res.body).to.be.have.property('result');
                    expect(res.body.result).to.be.equal('PENDING');
                    expect(res.body).to.be.have.property('branch');
                    expect(res.body.jobName).to.be.equal('test');
                    done();
                });
        });


    });

    describe('DELETE', function () {

        it('/api/jobs/:name/:buildId should 204 successful', function (done) {
            request.delete('/api/jobs/delete-me/1')
                .expect('Content-Type', /json/)
                .expect(204)
                .end(function (err, res) {
                    expect(Object.keys(res.body)).to.be.empty;
                    done();
                });
        });

    });

});