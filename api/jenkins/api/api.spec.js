var utils = require('../../../test/utils'),
    helpers = require('../../../test/functions'),
    app = require('../../index'),
    JobModel = require('../../jobs/model'),
    expect = require('chai').expect,
    request = require('supertest')(app),
    config = require('config'),
    nock = require('nock');

describe('Jenkins API', function () {

    function generateJenkinsJobApiPath(jobName, buildId) {
        return '/view/' + config.ci.view + '/job/' + jobName + '/' + buildId + '/api/json';
    };

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
                .get(generateJenkinsJobApiPath('missing-on-jenkins', 123))
                .reply(404, 'Nothing here');

            nock(config.ci.domain)
                .get(generateJenkinsJobApiPath('found-on-jenkins', 124))
                .reply(200, JSON.stringify({
                    builtOn: 'testNode',
                    result: 'SUCCESS',
                    duration: 1111111,
                    culprits: [{
                        name: 'name.here',
                        email: 'name.here@mail.com'
            }]
                }));

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
                if (err) done(err);
                expect(res.body.successful).to.be.equal(true);
                expect(res.body.message).to.be.equal('updated');
                done();
            });
    });

    it('should return a 404 and an error message if the job is not found in jenkins', function (done) {

        request.get('/api/jenkins/fetch/missing-on-jenkins/123')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                if (err) done(err);
                expect(res.body.successful).to.be.equal(false);
                expect(res.body.message).to.be.contain('Not found on CI.');
                done();
            });
    });

});