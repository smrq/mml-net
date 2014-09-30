'use strict';

module.exports = angular.module('mmlNet', [
	'ngRoute',
	'ui.bootstrap',
	require('../../../tmp/templates').name,
	require('../common').name,
	require('./editor').name,
	require('./piano-roll').name
]).config(function ($routeProvider) {
	$routeProvider.otherwise({ redirectTo: '/editor' });
});
