'use strict';

module.exports = angular.module('mmlNet.common.services', [])
	.service('midiNoteService', require('./midiNoteService'))
	.service('mmlDifficultyService', require('./mmlDifficultyService'))
	.service('mmlOptimizerService', require('./mmlOptimizerService'));
