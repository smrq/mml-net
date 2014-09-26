'use strict';

var _ = require('lodash');

/*@ngInject*/
function EditorController($scope, mmlOptimizerService) {
	var self = this;

	self.$scope = $scope;
	self.mmlOptimizerService = mmlOptimizerService;

	$scope.mml = 'c8d8d8f8';
	$scope.optimizedMml = '';
	$scope.optimizing = false;
	$scope.infmt = 'aa';
	$scope.outfmt = 'aa';

	$scope.selectInputFormat = self.selectInputFormat.bind(self);
	$scope.selectOutputFormat = self.selectOutputFormat.bind(self);

	$scope.$watchGroup(['mml', 'infmt', 'outfmt'], self.optimize.bind(self));
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

module.exports = EditorController;
