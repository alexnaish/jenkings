var QueueService = require('./'),
    QueueModel = require('../model'),
    sinon = require('sinon'),
    moment = require('moment'),
    expect = require('chai').expect;

describe('QueueService', function () {

    var saveStub, findStub, updateStub, consoleStub;

    beforeEach(function () {
        saveStub = sinon.stub(QueueModel.prototype, 'save');
        findStub = sinon.stub(QueueModel, 'find');
        consoleStub = sinon.stub(console, 'log');
    });

    afterEach(function () {
        QueueModel.prototype.save.restore();
        QueueModel.find.restore();
        console.log.restore();
    });

    it('create() should create a new queue event and call the save function', function () {

        QueueService.create('someId', ['param1', 'param2']);

        setTimeout(function () {
            expect(saveStub.calledOnce).to.be.equal(true);
        }, 0);

    });

    it('process() should find saved and unprocessed queue events and execute a function against it', function () {

        var testId = 'someId';
        var testData = [{
            identifier: testId,
            processed: false,
            dateCreated: moment().subtract(2, 'minutes'),
            parameters: ['testParam1', 2]
        }];

        findStub.withArgs({
            identifier: testId,
            processed: false
        }).yields(null, testData);


        QueueService.process(testId, null, consoleStub);

        setTimeout(function () {
            expect(consoleStub.calledOnce).to.be.equal(true);
        }, 0);

    });

});