var utils = require('../../../test/utils'),
    helpers = require('../../../test/functions'),
    app = require('../../index'),
    JobModel = require('../../jobs/model'),
    moment = require('moment'),
    _ = require('lodash'),
    expect = require('chai').expect,
    request = require('supertest')(app);

describe('Branch API ', function () {

    var assets = [{
        jobName: 'test-run-1',
        buildId: '123',
        result: 'FAILURE',
        project: 'test',
        branch: 'master',
        dateCreated: moment().subtract(2, 'days')
        }, {
        jobName: 'test-run-1',
        buildId: '124',
        result: 'SUCCESS',
        project: 'test',
        branch: 'master',
        dateCreated: moment().subtract(1, 'days')
        }, {
        jobName: 'test-run-2',
        buildId: '99',
        result: 'SUCCESS',
        project: 'test',
        branch: 'master',
        dateCreated: moment().subtract(12, 'hours')
        }, {
        jobName: 'test-run-1',
        buildId: '125',
        result: 'FAILURE',
        project: 'test',
        branch: 'test-branch',
        dateCreated: moment().subtract(6, 'hours')
        }, {
        jobName: 'test-run-2',
        buildId: '100',
        result: 'SUCCESS',
        project: 'test',
        branch: 'upgrade_pro',
        dateCreated: moment().subtract(2, 'days')
        }, {
        jobName: 'frontend-test',
        buildId: '1',
        result: 'FAILURE',
        project: 'test',
        branch: '491_test',
        dateCreated: moment().subtract(1, 'hours')
        }];

    var branchCount = 4,
        distinctJobsOnMaster = 2;


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

        it('/branches should return a 200 and list branches', function (done) {
            request.get('/api/branches')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.body).to.be.length(branchCount);
                    expect(res.body).to.contain('master');
                    expect(res.body).to.contain('test-branch');
                    expect(res.body).to.contain('upgrade_pro');
                    expect(res.body).to.contain('491_test');
                    done();
                });
        });

        it('/branches/:branch/jobs should return a 200 and will return the latest result of each distinct jobName for the branch', function (done) {
            request.get('/api/branches/master/jobs')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.body).to.be.length(distinctJobsOnMaster);

                    var jobs = _.pluck(res.body, 'jobName');
                    expect(jobs).to.contain('test-run-1');
                    expect(jobs).to.contain('test-run-2');
                    expect(jobs).to.not.contain('frontend-test');

                    var firstResult = _.find(res.body, function (job) {
                        return job.jobName === 'test-run-1';
                    });

                    expect(firstResult.buildId).to.be.equal('124');
                    expect(firstResult.result).to.be.equal('SUCCESS');

                    var secondResult = _.find(res.body, function (job) {
                        return job.jobName === 'test-run-2';
                    });

                    expect(secondResult.buildId).to.be.equal('99');
                    expect(secondResult.result).to.be.equal('SUCCESS');

                    done();
                });
        });

        it('/branches/:branch/jobs/:jobName should return a 200 and list all jobs with specified branch', function (done) {
            request.get('/api/branches/master/jobs/test-run-1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect(res.body).to.be.length(2);
                    expect(res.body[0].branch).to.contain('master');
                    expect(res.body[0].buildId).to.contain('124');
                    expect(res.body[0].jobName).to.contain('test-run-1');
                    done();
                });
        });

    });
});