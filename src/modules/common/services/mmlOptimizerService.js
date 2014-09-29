'use strict';

var opt = require('mml-optimizer');
var webworkify = require('webworkify');

/* @ngInject */
function MmlOptimizerService($q) {
	this.$q = $q;
}

MmlOptimizerService.prototype.parse = function (mml, options) {
	return opt.parse(mml, options);
};

MmlOptimizerService.prototype.generate = function (tokens, options) {
	var self = this;

	var deferred = self.$q.defer();
	var worker = webworkify(require('./mmlOptimizerService.generate'));
	worker.addEventListener('message', function (e) {
		deferred.resolve(e.data);
	});
	worker.postMessage({tokens: tokens, options: options});
	return deferred.promise;
};

module.exports = MmlOptimizerService;
