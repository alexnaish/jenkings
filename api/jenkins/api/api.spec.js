var utils = require('../../../test/utils'),
    helpers = require('../../../test/functions'),
    testData = require('../../../test/data'),
    app = require('../../index'),
    JobModel = require('../../jobs/model'),
    expect = require('chai').expect,
    request = require('supertest')(app),
    config = require('config'),
    nock = require('nock');

describe('Jenkins API', function () {

    var assets = [{
        jobName: 'missing-on-jenkins',
        buildId: '123',
        result: 'SUCCESS',
        branch: 'master'
        }, {
        jobName: 'found-on-jenkins',
        buildId: '124',
        result: 'FAILURE',
        branch: 'test-branch'
        }];

    before(function (done) {
        helpers.insertAssets(JobModel, assets, function () {

            nock(config.ci.domain)
                .get(helpers.generateJenkinsJobApiUrl('missing-on-jenkins', 123))
                .reply(404, 'Nothing here');

            nock(config.ci.domain)
                .get(helpers.generateJenkinsJobApiUrl('found-on-jenkins', 124))
                .reply(200, testData.createJenkinsApiResponse('UNSTABLE', 'found-on-jenkins', 124));

            done();
        });
    });

    after(function (done) {
        helpers.removeAssets(JobModel, {}, function () {
            done();
        });
    });

    it('should fetch details from jenkins if job exists in database and on jenkins', function (done) {

        request.get('/api/jenkins/fetch/found-on-jenkins/124')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                console.log('res', res);
                if (err) done(err);
                expect(res.body.jobName).to.be.equal('found-on-jenkins');
                expect(res.body.node).to.be.equal('testNode');
                expect(res.body.duration).to.be.equal(155674);
                expect(res.body.result).to.be.equal('UNSTABLE');
                expect(res.body.culprits).to.have.length(1);
                expect(res.body).to.have.property('runInfo');
                expect(res.body).to.have.property('commitInfo');
                expect(res.body).to.have.property('artifacts');
                done();
            });
    });

    it('should return a 404 and an error message if the job is not found in jenkins', function (done) {

        request.get('/api/jenkins/fetch/missing-on-jenkins/123')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                if (err) done(err);
                expect(res.body.message).to.be.contain('Not found on CI.');
                done();
            });
    });

});
