'use strict';

var d3 = require('d3');

module.exports = function pianoRoll() {
	return {
		restrict: 'E',
		scope: {
			mml: '=',
			tokens: '='
		},
		controller: 'smrqPianoRollController',
		link: function (scope, element, attrs, ctrl) {
			ctrl.init(element[0]);
		}
	};
};
