'use strict';

module.exports = angular.module('mmlNet.pianoRoll', [])
	.config(function ($routeProvider) {
		$routeProvider.when('/piano-roll', {
			templateUrl: 'app/piano-roll/layout.html',
			controller: 'pianoRollController'
		});
	})
	.controller('pianoRollController', require('./pianoRollController'))
	.directive('pianoRoll', require('./pianoRoll'));
