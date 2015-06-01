var app = require('../index.js'),
    request = require('supertest')(app),
    expect = require('chai').expect;

describe('JobRun', function () {
    describe('GET', function () {
        it('/jobs should list all job runs', function (done) {
            request.get('/jobs')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    expect(true).to.equal(false);
                    done(err);
                });
        });

        it('should return a 200 on a get to "/"', function (done) {
            request.get('/')
                .expect(200)
                .expect("Hello")
                .end(function (err, res) {
                    if (err)
                        done(err);
                    else
                        done();
                });
        });

    });
});
