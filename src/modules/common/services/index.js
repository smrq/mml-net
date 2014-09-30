'use strict';

module.exports = angular.module('mmlNet.common.services', [])
	.service('mmlDifficultyService', require('./mmlDifficultyService'))
	.service('mmlOptimizerService', require('./mmlOptimizerService'));
