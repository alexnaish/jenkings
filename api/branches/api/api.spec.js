var utils = require('../../../test/utils'),
    helpers = require('../../../test/functions'),
    app = require('../../index'),
    JobModel = require('../../jobs/model'),
    moment = require('moment'),
    expect = require('chai').expect,
    request = require('supertest')(app);

describe('Branch API ', function () {

    var assets = [{
        jobName: 'test-run-1',
        buildId: '123',
        successful: true,
        branch: 'master',
        dateCreated: moment().subtract(1, 'days')
        }, {
        jobName: 'test-run-1',
        buildId: '124',
        successful: true,
        branch: 'master',
        dateCreated: moment().subtract(12, 'hours')
        }, {
        jobName: 'test-run-1',
        buildId: '125',
        successful: false,
        branch: 'test-branch',
        dateCreated: moment().subtract(6, 'hours')
        }, {
        jobName: 'test-run-2',
        buildId: '100',
        successful: true,
        branch: 'upgrade_pro',
        dateCreated: moment().subtract(2, 'days')
        }, {
        jobName: 'frontend-test',
        buildId: '1',
        successful: false,
        branch: '491_test',
        dateCreated: moment().subtract(1, 'hours')
        }];

    var branchCount = 4;

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
            request.get('/branches')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    console.log('res.body', res.body);
                    expect(res.body).to.be.length(branchCount);
                    expect(res.body).to.contain('master');
                    expect(res.body).to.contain('test-branch');
                    expect(res.body).to.contain('upgrade_pro');
                    expect(res.body).to.contain('491_test');
                    done();
                });
        });

    });
});