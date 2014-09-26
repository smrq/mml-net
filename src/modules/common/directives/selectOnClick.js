'use strict';

module.exports = function selectOnClick() {
	return {
		restrict: 'A',
		link: function (scope, element) {
			element.on('click', function () {
				setTimeout(function () {
					element[0].select();
				}, 0);
			});
		}
	};
};
