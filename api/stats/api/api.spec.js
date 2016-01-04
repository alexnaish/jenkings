var expect = require('chai').expect,
    JobModel = require('../../jobs/model'),
    helpers = require('../../../test/functions'),
    app = require('../../index'),
    _ = require('lodash'),
    request = require('supertest')(app);

describe('Stats API', function () {

    var assets = [
        {
            jobName: 'test-run-1',
            buildId: '123',
            project: 'test1',
            dateCreated: Date.now() - 20000,
            result: 'FAILURE',
            branch: 'master'
        }, {
            jobName: 'test-run-1',
            buildId: '124',
            project: 'test1',
            dateCreated: Date.now(),
            result: 'SUCCESS',
            branch: 'master'
        }, {
            jobName: 'test-run-1',
            buildId: '124',
            project: 'test2',
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
            project: 'test3',
            result: 'SUCCESS',
            branch: 'master'
        }];

    var insertedAssets;

    before(function (done) {
        helpers.insertAssets(JobModel, assets, function (error, insertedDocuments) {
            insertedAssets = insertedDocuments;
            done();
        });
    });

    after(function (done) {
        helpers.removeAssets(JobModel, {}, function () {
            done();
        });
    });

    it('/stats/jobNames lists distinct job names', function (done) {
        request.get('/api/stats/jobNames')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                var expectedResults = _.pluck(_.uniq(assets, 'jobName'), 'jobName');
                expect(res.body.length).to.equal(expectedResults.length);
                expect(res.body).to.include.members(expectedResults);
                done();
            });
    });

    it('/stats/projects/:branch should list all projects for a specific branch', function (done) {
        request.get('/api/stats/projects/master')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);

                var expected = _.uniq(_.pluck(_.where(assets, {branch: 'master'}), 'project'));
                console.log('expected', expected);
                console.log('res.body', res.body);
                expect(res.body.length).to.equal(expected.length);
                expect(res.body).to.include.members(expected);

                done();
            });
    });

    describe('Stats History Endpoint', function () {

        it('should return a 400 and a JSON object containing an error message if invalid id specified', function (done) {
            request.get('/api/stats/history/someinvalididhere')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should return a 404 if valid id but no resource found', function (done) {

            request.get('/api/stats/history/123123123123123123123123')
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should list the results from the previous X jobs before the one specified', function (done) {

            var sampleAsset = _.findWhere(insertedAssets, { branch: 'master', project: 'test1', buildId: '124' });

            request.get('/api/stats/history/' + sampleAsset._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('length', 1);

                    var result = res.body[0];
                    expect(result).to.have.property('result', 'FAILURE');
                    expect(result).to.have.property('dateCreated');
                    expect(result).to.have.property('_id');

                    done();
                });
        });

    });


});