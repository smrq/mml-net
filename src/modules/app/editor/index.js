'use strict';

module.exports = angular.module('mml-net.editor', [])
	.config(function ($routeProvider) {
		$routeProvider.when('/editor', {
			templateUrl: 'app/editor/layout.html',
			controller: 'editorController'
		});
	})
	.controller('editorController', require('./editorController'));
