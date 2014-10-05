'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserifyShim = require('browserify-shim');
var varlessify = require('varlessify');

module.exports = gulp.task('browserify', function () {
	return browserify({
		entries: [config.paths.src.modules]
	})
	.transform(browserifyShim)
	.transform(varlessify, { file: config.paths.src.styles })
	.bundle()
	.pipe(source(config.filenames.release.scripts))
	.pipe(gulp.dest(config.paths.dest.release.scripts));
});
