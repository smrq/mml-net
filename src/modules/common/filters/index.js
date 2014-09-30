'use strict';

module.exports = angular.module('mmlNet.common.filters', [])
	.filter('mmlFormat', require('./mmlFormat'));
