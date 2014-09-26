'use strict';

var opt = require('mml-optimizer');

module.exports = function (self) {
	self.addEventListener('message', function (e) {
		var optimized = opt(e.data.mml, e.data.options);
		self.postMessage(optimized);
		self.close();
	});
};
