'use strict';

module.exports = angular.module('mml-net.common.filters', [])
	.filter('mmlFormat', require('./mmlFormat'));
