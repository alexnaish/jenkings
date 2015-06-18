var ScheduleService = require('./'),
    sinon = require('sinon'),
    expect = require('chai').expect;

describe('find functions', function () {

    var clock;
    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
    });

    it('should apply the function specified with the parameters after the interval defined', function () {

        var functionStub = sinon.stub();

        ScheduleService.schedule(functionStub, ['one', 'two', 'three'], 5 * 1000);

        expect(functionStub.called).to.be.equal(false);

        clock.tick(6 * 1000);

        expect(functionStub.calledOnce).to.be.equal(true);
        expect(functionStub.firstCall.args[0]).to.be.equal('one');
        expect(functionStub.firstCall.args[1]).to.be.equal('two');
        expect(functionStub.firstCall.args[2]).to.be.equal('three');

    });

});