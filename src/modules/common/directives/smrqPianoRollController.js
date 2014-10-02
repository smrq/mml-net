function pianoRollController($scope) {
	this.$scope = $scope;
	$scope.$watch('tokens', this.render.bind(this));
}

pianoRollController.prototype.init = function(element) {
	this.svg = d3.select(element)
		.append('svg')
		.style('width', '100%');
};

pianoRollController.prototype.render = function() {
	var notes = this.svg
		.selectAll('g')
		.data(
			this.$scope.tokens.filter(function (token) { return token.type === 'note'; }),
			function (d) { return JSON.stringify(d); });
	notes.enter()
		.append('g')
		.call(notesEnter)
		.transition(1000)
		.call(notesEnterTransition);
	notes.exit()
		.transition(1000)
		.call(notesExitTransition)
		.remove();

	function notesEnter(g) {
		g.attr('transform', function (d) { return 'translate(' + (d.time / 4) + ',' + (d.pitch) + ')'; })
			.append('text')
			.text(function (d) { return d.pitch + ' @ ' + d.time; });
	}

	function notesEnterTransition(g) {
		g.styleTween('fill', function () { return d3.interpolate('#fff', '#000'); });
	}

	function notesExitTransition(g) {
		g.select('text')
			.style('fill', '#fff');
	}
};

module.exports = pianoRollController;
