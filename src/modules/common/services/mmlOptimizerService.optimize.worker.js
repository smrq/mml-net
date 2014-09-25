'use strict';

var opt = require('mml-optimizer');

module.exports = function (self) {
	self.addEventListener('message', function (e) {
		var optimized = opt(e.data);
		self.postMessage(optimized);
		self.close();
	});
};
