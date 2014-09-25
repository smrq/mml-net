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

	$scope.$watch('mml', self.optimize.bind(self));
}

EditorController.prototype.optimize = function optimize() {
	var self = this;

	self.$scope.optimizing = true;
	self.mmlOptimizerService.optimize(self.$scope.mml)
		.then(function (mml) {
			self.$scope.optimizedMml = mml;
			self.$scope.optimizing = false;
		});
};

module.exports = EditorController;
