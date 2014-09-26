'use strict';

module.exports = angular.module('mml-net.common.services', [])
	.service('mmlDifficultyService', require('./mmlDifficultyService'))
	.service('mmlOptimizerService', require('./mmlOptimizerService'));
