'use strict';

module.exports = angular.module('mmlNet.common.directives', [])
	.directive('smrqPianoRoll', require('./smrqPianoRoll'))
	.controller('smrqPianoRollController', require('./smrqPianoRollController'))
	.directive('smrqSelectOnClick', require('./smrqSelectOnClick'));
