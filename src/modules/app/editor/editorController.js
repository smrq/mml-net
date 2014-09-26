'use strict';

var _ = require('lodash');

/*@ngInject*/
function EditorController($scope, mmlDifficultyService, mmlOptimizerService) {
	var self = this;

	self.$scope = $scope;
	self.mmlDifficultyService = mmlDifficultyService;
	self.mmlOptimizerService = mmlOptimizerService;

	$scope.mml = 'c8d8d8f8';
	$scope.optimizedMml = '';
	$scope.optimizedRank = '';
	$scope.optimizing = false;
	$scope.infmt = 'aa';
	$scope.outfmt = 'aa';

	$scope.selectInputFormat = self.selectInputFormat.bind(self);
	$scope.selectOutputFormat = self.selectOutputFormat.bind(self);

	$scope.$watchGroup(['mml', 'infmt', 'outfmt'], self.optimize.bind(self));
	$scope.$watchGroup(['optimizedMml', 'outfmt'], self.calculateRank.bind(self));
}

EditorController.prototype.selectInputFormat = function selectInputFormat(format) {
	this.$scope.infmt = format;
};

EditorController.prototype.selectOutputFormat = function selectInputFormat(format) {
	this.$scope.outfmt = format;
};

EditorController.prototype.optimize = function optimize() {
	var self = this;

	self.$scope.optimizing = true;
	self.mmlOptimizerService.optimize(
		self.$scope.mml,
		{ input: self.$scope.infmt, output: self.$scope.outfmt}
	).then(function (mml) {
		self.$scope.optimizedMml = mml;
		self.$scope.optimizing = false;
	});
};

EditorController.prototype.calculateRank = function calculateRank() {
	this.$scope.optimizedRank = this.mmlDifficultyService.getDifficultyRank(
		this.$scope.optimizedMml,
		this.$scope.outfmt);
};

module.exports = EditorController;
