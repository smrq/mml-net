'use strict';

/* @ngInject */
function mmlFormat() {
	return function (format) {
		switch (format) {
			case 'aa': return 'ArcheAge';
			case 'mabi': return 'Mabinogi';
			default: return format;
		}
	};
}

module.exports = mmlFormat;
