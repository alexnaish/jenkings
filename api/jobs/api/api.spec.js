var utils = require('../../../test/utils'),
    helpers = require('../../../test/functions'),
    testData = require('../../../test/data'),
    app = require('../../index'),
    JobModel = require('../model'),
    config = require('config'),
    nock = require('nock'),
    expect = require('chai').expect,
    request = require('supertest')(app);

describe('JobRun API', function () {

    var assets = [{
        jobName: 'test-run-1',
        buildId: '123',
        result: 'SUCCESS',
        branch: 'master'
        }, {
        jobName: 'test-run-1',
        buildId: '124',
        result: 'FAILURE',
        branch: 'test-branch'
        }, {
        jobName: 'test-run-2',
        buildId: '100',
        result: 'PENDING',
        branch: 'master'
        }, {
        jobName: 'delete-me',
        buildId: '1',
        result: 'SUCCESS',
        branch: 'master'
        }];

    before(function (done) {
        helpers.insertAssets(JobModel, assets, function () {
            done();
        });
    });

    after(function (done) {
        helpers.removeAssets(JobModel, {}, function () {
            done();
        });
    });

    describe('GET', function () {

        it('/jobs should return a 200 and list all job runs', function (done) {
            request.get('/api/jobs')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.body).to.be.length(assets.length);
                    done();
                });
        });

        it('/jobs/:name should return a 200 and list all job runs where jobName equals name', function (done) {
            request.get('/api/jobs/test-run-1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.body).to.be.length(2);
                    done();
                });
        });

        it('/jobs/:name/:buildId should return a 200 and list one specific run', function (done) {
            request.get('/api/jobs/test-run-1/123')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.body).to.be.length(1);
                    expect(res.body[0].jobName).to.be.equal('test-run-1');
                    expect(res.body[0].buildId).to.be.equal('123');
                    expect(res.body[0].result).to.be.equal('SUCCESS');
                    expect(res.body[0].branch).to.be.equal('master');
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
                result: 'FAILURE'
            };

            request.post('/api/jobs')
                .send(payload)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {

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

        it('/jobs should 201 and return updated document with jenkins info if current result is PENDING', function (done) {

            var payload = {
                jobName: 'test-job',
                buildId: 2,
                branch: 'master_branch',
                result: 'PENDING'
            };

            nock(config.ci.domain)
                .get(helpers.generateJenkinsJobApiUrl('test-job', 2))
                .reply(200, testData.sampleJenkinsApiResponse);

            request.post('/api/jobs')
                .send(payload)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    expect(res.body).to.be.have.property('_id');
                    expect(res.body).to.be.have.property('jobName');
                    expect(res.body.jobName).to.be.equal('test-job');
                    expect(res.body).to.be.have.property('buildId');
                    expect(res.body.buildId).to.be.equal('2');
                    expect(res.body).to.be.have.property('result');
                    expect(res.body.result).to.be.equal('UNSTABLE');
                    expect(res.body).to.be.have.property('branch');
                    expect(res.body.branch).to.be.equal('master_branch');
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
