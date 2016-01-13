'use strict';

var helpers = require('../../../test/functions'),
    app = require('../../index'),
    LocationModel = require('../../location/model'),
    expect = require('chai').expect,
    request = require('supertest')(app),
    sinon = require('sinon');

describe('Locations API', function () {
    let sandbox;

    const assets = [
        {
            name: 'test-location-1',
            urlTemplate: 'test.com/123/{buildId}'
        },
        {
            name: 'test-location-2',
            urlTemplate: 'test.com/321/{buildId}'
        },
        {
            name: 'test-location-3',
            urlTemplate: 'anotherurl.com/123/{buildId}'
        }
    ];

    let insertedAssets;

    before(function (done) {
        helpers.insertAssets(LocationModel, assets, function (err, results) {
            insertedAssets = results;
            done();
        });
    });

    after(function (done) {
        helpers.removeAssets(LocationModel, {}, function (err, results) {
            done();
        });
    });

    beforeEach( () => sandbox = sinon.sandbox.create() );

    afterEach( () => sandbox.restore() );

    describe('FIND', function () {

        it('/api/locations should return an array containing all locations stored', function (done) {
            request.get('/api/locations')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.length(assets.length);
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('dateCreated');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('urlTemplate');
                    done();
                });
        });
        
        it('/api/locations/:id should return the location object matching that id', function (done) {
            const testAsset = insertedAssets[0];
            request.get('/api/locations/'+testAsset._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    
                    expect(res.body).to.have.property('_id', testAsset._id);
                    expect(res.body).to.have.property('name', testAsset.name);
                    expect(res.body).to.have.property('urlTemplate', testAsset.urlTemplate);
                    
                    done();
                });
        });
        
        it('/api/locations/:id should return a 400 if the id is invalid', function (done) {
            request.get('/api/locations/someKindOfInvalidId')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error');                    
                    done();
                });
        });
        
        it('/api/locations/:id should return a 404 if the id is valid but no location is found', function (done) {
            request.get('/api/locations/abcabcabcabcabcabcabcabc')
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error');                    
                    done();
                });
        });
        
    });
    
    describe('CREATE', function(){
        
    });
    
    describe('UPDATE', function () {
       
        it('/api/locations/:id should return a 200 if the location was successfully updated and should return the payload', function (done) {
            
            const testAsset = insertedAssets[0];
            const newName = 'SomeTestingName';
            
            testAsset.name = newName; 
            
            request.put('/api/locations/'+testAsset._id)
                .send(testAsset)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    
                    expect(res.body).to.have.property('name', newName);
                    expect(res.body).to.have.property('urlTemplate', testAsset.urlTemplate);
                    
                                        
                    done();
                });
        });

        it('/api/locations/:id should return a 400 if the id is invalid', function (done) {
            request.put('/api/locations/someKindOfInvalidId')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });


        it('/api/locations/:id should return a 500 if there is an error', function (done) {
            sandbox.stub(LocationModel, 'update').yields(true);

            request.put(`/api/locations/${insertedAssets[0]._id}`)
                .send({})
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
        
    });

});