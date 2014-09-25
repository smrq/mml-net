'use strict';

module.exports = angular.module('mml-net', [
	'ngRoute',
	'ui.bootstrap',
	require('../../../tmp/templates').name,
	require('../common').name,
	require('./editor').name
]).config(function ($routeProvider) {
	$routeProvider.otherwise({ redirectTo: '/editor' });
});
