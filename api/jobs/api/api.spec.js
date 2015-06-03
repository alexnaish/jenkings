var utils = require('../../../test/utils'),
    helpers = require('../../../test/functions'),
    app = require('../../index'),
    JobModel = require('../model'),
    expect = require('chai').expect,
    request = require('supertest')(app);

describe('JobRun', function () {

    var assets = [{
        jobName: 'test-run-1',
        buildId: '123',
        successful: true,
        branch: 'master'
        }, {
        jobName: 'test-run-1',
        buildId: '124',
        successful: false,
        branch: 'test-branch'
        }, {
        jobName: 'test-run-2',
        buildId: '100',
        successful: true,
        branch: 'master'
        }, {
        jobName: 'delete-me',
        buildId: '1',
        successful: false,
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
            request.get('/jobs')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.body).to.be.length(assets.length);
                    done();
                });
        });

        it('/jobs/:name should return a 200 and list all job runs where jobName equals name', function (done) {
            request.get('/jobs/test-run-1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.body).to.be.length(2);
                    done();
                });
        });

        it('/jobs/:name/:buildId should return a 200 and list one specific run', function (done) {
            request.get('/jobs/test-run-1/123')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.body).to.be.length(1);
                    expect(res.body[0].jobName).to.be.equal('test-run-1');
                    expect(res.body[0].buildId).to.be.equal('123');
                    expect(res.body[0].successful).to.be.equal(true);
                    expect(res.body[0].branch).to.be.equal('master');
                    done();
                });
        });

    });

    describe('POST', function () {

        it('/jobs should 403 if payload doesnt pass validation', function (done) {
            request.post('/jobs')
                .send({})
                .expect('Content-Type', /json/)
                .expect(403)
                .end(function (err, res) {
                    expect(res.body).to.be.have.property('message');
                    expect(res.body.message).to.be.contain('ValidationError');
                    expect(res.body).to.be.have.property('errors');
                    expect(res.body.errors).to.have.length(4);
                    expect(res.body.errors).to.contain('jobName');
                    expect(res.body.errors).to.contain('buildId');
                    expect(res.body.errors).to.contain('successful');
                    expect(res.body.errors).to.contain('branch');
                    done();
                });
        });

        it('/jobs should 201 and return document if payload passes validation and is stored', function (done) {

            var payload = {
                jobName: 'test',
                buildId: 1,
                successful: true,
                branch: 'test'
            };

            request.post('/jobs')
                .send(payload)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    expect(res.body).to.be.have.property('_id');
                    expect(res.body).to.be.have.property('jobName');
                    expect(res.body.jobName).to.be.equal('test');
                    expect(res.body).to.be.have.property('buildId');
                    expect(res.body.buildId).to.be.equal('1');
                    expect(res.body).to.be.have.property('successful');
                    expect(res.body).to.be.have.property('branch');
                    done();
                });
        });

    });

    describe('DELETE', function () {

        it('/jobs/:name/:buildId should 204 successful', function (done) {
            request.delete('/jobs/delete-me/1')
                .expect('Content-Type', /json/)
                .expect(204)
                .end(function (err, res) {
                    //                    expect(res.body).to.have.property('affected');
                    //                    expect(res.body.affected).to.be.equal(1);
                    done();
                });
        });

    });

});
