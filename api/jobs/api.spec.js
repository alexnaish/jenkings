var utils = require('../../test/utils'),
    JobService = require('./service'),
    expect = require('chai').expect,
    request = require('supertest')(app);

describe('JobRun', function () {
    describe('GET', function () {

        beforeEach(function (done) {
            done();
        });

        afterEach(function (done) {
            done();
        });

        it('/jobs should return a 200 and list all job runs', function (done) {
            request.get('/jobs')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);
                    expect([]).to.be.equal([]);
                    done();
                });
        });

        it('/jobs/:name should return a 200 and list all job runs where jobName equals name', function (done) {
            request.get('/jobs/name')
                .expect(200)
                .end(function (err, res) {
                    if (err)
                        done(err);
                    else
                        done();
                });
        });

        it('/jobs/:name/:buildId should return a 200 and list one specific run', function (done) {
            request.get('/jobs/name/')
                .expect(200)
                .end(function (err, res) {
                    if (err)
                        done(err);
                    else
                        done();
                });
        });

    });
});
