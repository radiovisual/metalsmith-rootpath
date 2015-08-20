'use strict';

require('harmonize')();

var rootPath = require('../');
var Metalsmith = require("metalsmith");
var assert = require("assert");
var path = require('path');
var fs = require('fs');

var rm = require("rimraf").sync;


describe('metalsmith-rootpath', function(){

    beforeEach(function(){
        rm('/test/fixtures/build');
    });


    it('should set a rootPath value on Metalsmith metadata', function(done){

        Metalsmith('test/fixtures')
            .use(rootPath())
            .build(function(err, files){
                if (err) return done(err);
                assert(files['index.html'].hasOwnProperty("rootPath"));
                done();
        });

    });

    it('should set rootPath to empty string when file is in root directory', function(done){

        Metalsmith('test/fixtures')
            .use(rootPath())
            .build(function(err, files){
                if (err) return done(err);
                assert.equal(files['index.html'].rootPath, "");
                done();
            });

    });

    it('should set rootPath to `../` on files one directory down', function(done){

        Metalsmith('test/fixtures')
            .use(rootPath())
            .build(function(err, files){
                if (err) return done(err);
                assert.equal(files['1.0/index.html'].rootPath, "../");
                done();
            });

    });

    it('should set rootPath to `../../` on files two directories down', function(done){

        Metalsmith('test/fixtures')
            .use(rootPath())
            .build(function(err, files){
                if (err) return done(err);
                assert.equal(files['1.0/1.1/index.html'].rootPath, "../../");
                done();
            });

    });

    it('should set rootPath to `../../../` on files three directories down', function(done){

        Metalsmith('test/fixtures')
            .use(rootPath())
            .build(function(err, files){
                if (err) return done(err);
                assert.equal(files['1.0/1.1/1.2/index.html'].rootPath, "../../../");
                done();
            });

    });


    it('should set rootPath to `../../../../` on files four directories down', function(done){

        Metalsmith('test/fixtures')
            .use(rootPath())
            .build(function(err, files){
                if (err) return done(err);
                assert.equal(files['1.0/1.1/1.2/1.3/index.html'].rootPath, "../../../../");
                done();
            });

    });


});