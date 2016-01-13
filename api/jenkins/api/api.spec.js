var helpers = require('../../../test/functions'),
    testData = require('../../../test/data'),
    app = require('../../index'),
    JobModel = require('../../jobs/model'),
    LocationModel = require('../../location/model'),
    expect = require('chai').expect,
    request = require('supertest')(app),
    nock = require('nock'),
    _ = require('lodash');

describe('Jenkins API', function () {

    var assets = [
        {
            jobName: 'missing-on-jenkins',
            buildId: '123',
            result: 'SUCCESS',
            project: 'test',
            branch: 'master'
        },
        {
            jobName: 'found-on-jenkins',
            buildId: '124',
            result: 'FAILURE',
            project: 'test',
            branch: 'test-branch'
        }];

    var foundAsset, notFoundAsset;

    var domain = 'http://jenkins.com';
    var location = { name: 'test-jenkins', urlTemplate: domain+'/{jobName}/{buildId}' };

    before(function (done) {
        helpers.insertAssets(LocationModel, location, function(err, results){
            var insertedLocation = results[0];
            assets.map(function(asset){
                asset.location = insertedLocation._id;
            });
            
            done();
            
        });
    });

    before(function (done) {
        helpers.insertAssets(JobModel, assets, function (err, results) {
            if (err) throw err;

            results.map(function(job) {
                job.location = location; //fix so nocked out URLs can generate the correct URL
                return job; 
            });
            
            foundAsset = _.find(results, { 'jobName': 'found-on-jenkins' });
            notFoundAsset = _.find(results, { 'jobName': 'missing-on-jenkins' });


            nock(domain)
                .get(helpers.generateJenkinsJobApiUrl(notFoundAsset).replace(domain, ''))
                .reply(404, 'Nothing here');
            
            nock(domain)
                .get(helpers.generateJenkinsJobApiUrl(foundAsset).replace(domain, ''))
                .reply(200, testData.createJenkinsApiResponse('UNSTABLE', foundAsset.jobName, foundAsset.buildId));

            done();
        });
    });

    after(function (done) {
        helpers.removeAssets(JobModel, {}, function () {
            done();
        });
    });

    it('should fetch details from jenkins if job exists in database and on jenkins', function (done) {

        request.get('/api/jenkins/fetch/' + foundAsset._id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                
                console.log('res', res.body);
                
                if (err) return done(err);
                expect(res.body.jobName).to.be.equal('found-on-jenkins');
                expect(res.body.node).to.be.equal('testNode');
                expect(res.body.result).to.be.equal('UNSTABLE');
                expect(res.body.culprits).to.have.length(1);
                expect(res.body).to.have.property('duration');
                expect(res.body).to.have.property('runInfo');
                expect(res.body).to.have.property('commitInfo');
                expect(res.body).to.have.property('artifacts');
                done();
            });
    });

    it('should return a 404 and an error message if the job is not found in jenkins', function (done) {

        request.get('/api/jenkins/fetch/' + notFoundAsset._id)
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).to.be.contain('Not found on CI.');
                done();
            });
    });

    it('should return a 200 and return the test report from jenkins if it exists', function (done) {

        request.get('/api/jenkins/fetch/' + foundAsset._id + '/testReport')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err) {
                if (err) return done(err);
                // expect(res.body.message).to.be.contain('Not found on CI.');
                done();
            });
    });

});
