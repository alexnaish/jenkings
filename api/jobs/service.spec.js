var sinon = require('sinon'),
    JobRun = require('./model'),
    expect = require('chai').expect;

describe('Job Service', function () {
    before(function (done) {
        sinon.stub(JobRun, 'find').yields(null, []);
        done();
    });

    after(function (done) {
        JobRun.find.restore();
        done();
    });

    it('find will will return empty array if no results', function (done) {

        expect(false).to.be.equal(true);
        done();
    });
});
