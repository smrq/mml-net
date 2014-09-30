'use strict';

/*@ngInject*/
function EditorController($scope, mmlDifficultyService, mmlOptimizerService) {
	this.$scope = $scope;
	this.mmlDifficultyService = mmlDifficultyService;
	this.mmlOptimizerService = mmlOptimizerService;

	$scope.mml = 'L8cdef,cdef,cdef';
	$scope.tokens = [];
	$scope.optimizedMml = '';
	$scope.optimizedRank = '';
	$scope.infmt = 'aa';
	$scope.outfmt = 'aa';
	$scope.transpose = 0;

	$scope.selectInputFormat = this.selectInputFormat.bind(this);
	$scope.selectOutputFormat = this.selectOutputFormat.bind(this);

	$scope.$watchGroup(
		['mml', 'infmt', 'outfmt', 'transpose'],
		this.parse.bind(this));
	$scope.$watchGroup(
		['tokens', 'outfmt', 'transpose'],
		this.generate.bind(this));
	$scope.$watchGroup(
		['optimizedMml', 'outfmt'],
		this.calculateRank.bind(this));
}

EditorController.prototype.selectInputFormat = function selectInputFormat(format) {
	this.$scope.infmt = format;
};

EditorController.prototype.selectOutputFormat = function selectInputFormat(format) {
	this.$scope.outfmt = format;
};

EditorController.prototype.optimizerOptions = function optimizerOptions() {
	return {
		input: this.$scope.infmt,
		output: this.$scope.outfmt,
		transpose: this.$scope.transpose
	};
};

EditorController.prototype.parse = function parse() {
	this.$scope.tokens = this.mmlOptimizerService.parse(
		this.$scope.mml,
		this.optimizerOptions());
};

EditorController.prototype.generate = function generate() {
	var self = this;
	self.mmlOptimizerService.generate(
		self.$scope.tokens,
		self.optimizerOptions())
	.then(function (optimized) {
		self.$scope.optimizedMml = optimized;
	});
};

EditorController.prototype.calculateRank = function calculateRank() {
	this.$scope.optimizedRank = this.mmlDifficultyService.getDifficultyRank(
		this.$scope.optimizedMml,
		this.$scope.outfmt);
};

module.exports = EditorController;
