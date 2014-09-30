'use strict';

/*@ngInject*/
function PianoRollController($scope, mmlOptimizerService) {
	this.$scope = $scope;
	this.mmlOptimizerService = mmlOptimizerService;

	$scope.mml = 'L8cdefgab>c';
	$scope.tokens = [];

	$scope.$watch('mml', this.parse.bind(this));
}

PianoRollController.prototype.parse = function() {
	this.$scope.tokens = this.mmlOptimizerService.parse(this.$scope.mml);
};

module.exports = PianoRollController;
