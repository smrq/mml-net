'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserifyShim = require('browserify-shim');
var varlessify = require('varlessify');

module.exports = gulp.task('watchify', function () {
	var bundler = watchify({
		entries: [config.paths.src.modules]
	})
	.transform(browserifyShim)
	.transform(varlessify, { file: config.paths.src.styles });
	bundler.on('update', rebundle);
	return rebundle();

	function rebundle() {
		return bundler.bundle({ debug: true })
			.pipe(source(config.filenames.build.scripts))
			.pipe(gulp.dest(config.paths.dest.build.scripts));
	}
});
