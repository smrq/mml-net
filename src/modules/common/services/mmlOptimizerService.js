'use strict';

var webworkify = require('webworkify');

/* @ngInject */
function MmlOptimizerService($q) {
	this.$q = $q;
}

MmlOptimizerService.prototype.optimize = function (mml) {
	var self = this;

	var deferred = self.$q.defer();
	var worker = webworkify(require('./mmlOptimizerService.optimize.worker.js'));
	worker.addEventListener('message', function (e) {
		deferred.resolve(e.data);
	});
	worker.postMessage(mml);
	return deferred.promise;
};

module.exports = MmlOptimizerService;
