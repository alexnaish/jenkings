var ValidationService = require('./'),
    sinon = require('sinon'),
    expect = require('chai').expect;

describe('Validation functions', function () {

    var reqStub, resStub, resStatusStub, resJsonStub, nextStub;
    
    beforeEach(function () {
        nextStub = sinon.stub();
        reqStub = {
            params: {
                id: '567943b4b2ea645b1d5d6a08'
            }
        };
        resJsonStub = sinon.stub();
        resStatusStub = sinon.stub().returns({
            json: resJsonStub
        });

        resStub = {
            status: resStatusStub
        };
    });



    describe('ValidateObjectId', function () {

        it('should call next if req.param.id is a valid objectid', function () {
            
            ValidationService.validateObjectId(reqStub, resStub, nextStub);
            
            expect(resStatusStub.called).to.equal(false);
            expect(resJsonStub.called).to.equal(false);
            expect(nextStub.called).to.equal(true);
        });
        
        it('should not call next if req.param.id is missing', function () {
            
            delete reqStub.params.id;
            
            ValidationService.validateObjectId(reqStub, resStub, nextStub);
            
            expect(resStatusStub.firstCall.args[0]).to.equal(400);
            expect(resJsonStub.firstCall.args[0]).to.have.property('error', 'Invalid ID.');
            expect(nextStub.called).to.equal(false);
        });
        
        it('should not call next if req.param.id is invalid', function () {
            
            reqStub.params.id = 'a-non-valid-object-id';
            
            ValidationService.validateObjectId(reqStub, resStub, nextStub);
            
            expect(resStatusStub.firstCall.args[0]).to.equal(400);
            expect(resJsonStub.firstCall.args[0]).to.have.property('error', 'Invalid ID.');
            expect(nextStub.called).to.equal(false);
        });
        
        
    });

});