var sinon = require('sinon'),
    BranchService = require('../service/'),
    JobRun = require('../../jobs/model'),
    expect = require('chai').expect;

describe('Branch Service', function () {

    describe('findDistinct function', function () {

        before(function () {

        });

        after(function (done) {
            done();
        });

        it('find will return a 200 and an error object if an error occurs', function (done) {
            BranchService.findDistinct(function (statusCode, result) {
                //                expect(false).to.be.ok;
                done();
            });
        });

    });

});
