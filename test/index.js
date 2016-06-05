'use strict';
require('harmonize')();
var rootPath = require('../');
var Metalsmith = require('metalsmith');
var assert = require('assert');
var rm = require('rimraf').sync;
var path = require('path');
var permalinks = require('metalsmith-permalinks');

describe('metalsmith-rootpath', function () {
	beforeEach(function () {
		rm('/test/fixtures/static/build');
	});

	it('should set a rootPath value on Metalsmith metadata', function (done) {
		Metalsmith('test/fixtures/static')
			.use(rootPath())
			.build(function (err, files) {
				if (err) {
					return done(err);
				}
				assert(files['index.html'].hasOwnProperty('rootPath'));
				done();
			});
	});

	it('should set rootPath to empty string when file is in root directory', function (done) {
		Metalsmith('test/fixtures/static')
			.use(rootPath())
			.build(function(err, files) {
				if (err) {
					return done(err);
				}
				assert.equal(files['index.html'].rootPath, '');
				done();
			});
	});

	it('should set rootPath to `../` on files one directory down', function (done) {
		Metalsmith('test/fixtures/static')
			.use(rootPath())
			.build(function (err, files) {
				if (err) {
					return done(err);
				}
				var file = path.join('1.0', 'index.html');
				assert.equal(files[file].rootPath, '../');
				done();
			});
	});

	it('should set rootPath to `../../` on files two directories down', function (done) {
		Metalsmith('test/fixtures/static')
			.use(rootPath())
			.build(function (err, files) {
				if (err) {
					return done(err);
				}
				var file = path.join('1.0', '1.1', 'index.html');
				assert.equal(files[file].rootPath, '../../');
				done();
			});
	});

	it('should set rootPath to `../../../` on files three directories down', function (done) {
		Metalsmith('test/fixtures/static')
			.use(rootPath())
			.build(function (err, files) {
				if (err) {
					return done(err);
				}
				var file = path.join('1.0', '1.1', '1.2', 'index.html');
				assert.equal(files[file].rootPath, '../../../');
				done();
			});
	});

	it('should set rootPath to `../../../../` on files four directories down', function (done) {
		Metalsmith('test/fixtures/static')
			.use(rootPath())
			.build(function (err, files) {
				if (err) {
					return done(err);
				}
				var file = path.join('1.0', '1.1', '1.2', '1.3', 'index.html');
				assert.equal(files[file].rootPath, '../../../../');
				done();
			});
	});

	it('should set rootPath even if file locations have been changed', function (done) {
		Metalsmith('test/fixtures/reorder')
			.use(permalinks({
				pattern: ':date',
				date: 'YYYY/MM'
			}))
			.use(rootPath())
			.build(function (err, files) {
				if (err) {
					return done(err);
				}
				var file1 = path.join('2012', '01', 'index.html');
				assert.equal(files[file1].rootPath, '../../');

				assert.equal(files['index.html'].rootPath, '');
				done();
			});
	});

});
