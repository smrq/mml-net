'use strict';

var rankDifficulty = {
	'aa': function (mml) {
		var length = mml.length;

		if (length <= 200)
			return 'Amateur';
		if (length <= 400)
			return 'Novice';
		if (length <= 600)
			return 'Veteran';
		if (length <= 800)
			return 'Expert';
		if (length <= 1000)
			return 'Master';
		return 'Impossible';
	},
	'mabi': function (mml) {
		var split = mml.split(',');
		var length1 = (split[0] || '').length;
		var length2 = (split[1] || '').length;
		var length3 = (split[2] || '').length;
		var length4 = (split[3] || '').length;

		if (length1 <= 200 && length2 <= 100 && length3 === 0 && length4 <= 200)
			return 'Practice';
		if (length1 <= 400 && length2 <= 200 && length3 <= 100 && length4 <= 400)
			return 'Rank F';
		if (length1 <= 500 && length2 <= 200 && length3 <= 100 && length4 <= 500)
			return 'Rank E';
		if (length1 <= 600 && length2 <= 250 && length3 <= 150 && length4 <= 600)
			return 'Rank D';
		if (length1 <= 650 && length2 <= 250 && length3 <= 200 && length4 <= 650)
			return 'Rank C';
		if (length1 <= 700 && length2 <= 300 && length3 <= 200 && length4 <= 700)
			return 'Rank B';
		if (length1 <= 750 && length2 <= 300 && length3 <= 200 && length4 <= 750)
			return 'Rank A';
		if (length1 <= 800 && length2 <= 350 && length3 <= 200 && length4 <= 800)
			return 'Rank 9';
		if (length1 <= 850 && length2 <= 400 && length3 <= 200 && length4 <= 850)
			return 'Rank 8';
		if (length1 <= 900 && length2 <= 400 && length3 <= 200 && length4 <= 900)
			return 'Rank 7';
		if (length1 <= 950 && length2 <= 450 && length3 <= 200 && length4 <= 950)
			return 'Rank 6';
		if (length1 <= 1000 && length2 <= 500 && length3 <= 250 && length4 <= 1000)
			return 'Rank 5';
		if (length1 <= 1050 && length2 <= 550 && length3 <= 300 && length4 <= 1050)
			return 'Rank 4';
		if (length1 <= 1100 && length2 <= 600 && length3 <= 350 && length4 <= 1100)
			return 'Rank 3';
		if (length1 <= 1150 && length2 <= 700 && length3 <= 400 && length4 <= 1150)
			return 'Rank 2';
		if (length1 <= 1200 && length2 <= 800 && length3 <= 500 && length4 <= 1200)
			return 'Rank 1';
		return 'Impossible';
	}
};

/* @ngInject */
function MmlDifficultyService() {}

MmlDifficultyService.prototype.getDifficultyRank = function (mml, format) {
	var self = this;
	return rankDifficulty[format](mml);
};

module.exports = MmlDifficultyService;
