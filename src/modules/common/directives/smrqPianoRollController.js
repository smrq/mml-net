function pianoRollController($scope) {
	this.$scope = $scope;
	$scope.$watch('tokens', this.render.bind(this));
}

pianoRollController.prototype.init = function(element) {
	this.element = element;
	this.svg = d3.select(element)
		.append('svg')
		.style('width', '100%')
		.style('height', '100%');
};

pianoRollController.prototype.render = function() {
	var noteData = this.$scope.tokens.filter(function (token) {
		return token.type === 'note';
	});

	var margin = 10;

	var scaleX = d3.scale.linear()
		.domain([0, d3.max(noteData, function (d) { return d.time + d.ticks; })])
		.range([margin, this.element.offsetWidth - margin]);
	var scaleY = d3.scale.linear()
		.domain(d3.extent(noteData, function (d) { return d.pitch; }))
		.range([this.element.offsetHeight - margin, margin]);
	console.log(scaleX);
	console.log(scaleY);

	var notes = this.svg
		.selectAll('g')
		.data(noteData, function (d) { return JSON.stringify(d); });
	notes.enter()
		.append('g')
		.call(notesEnter)
		.transition(1000)
		.call(notesEnterTransition);
	notes.transition(1000)
		.call(notesUpdateTransition);
	notes.exit()
		.transition(1000)
		.call(notesExitTransition)
		.remove();

	function notesEnter(g) {
		g.attr('transform', function (d) { return 'translate(' + scaleX(d.time) + ',' + scaleY(d.pitch) + ')'; })
			.append('text')
			.text(function (d) { return d.pitch; });
	}

	function notesEnterTransition(g) {
		g.styleTween('fill', function () { return d3.interpolate('#fff', '#000'); });
	}

	function notesUpdateTransition(g) {
		g.attr('transform', function (d) { return 'translate(' + scaleX(d.time) + ',' + scaleY(d.pitch) + ')'; });
	}

	function notesExitTransition(g) {
		g.select('text')
			.style('fill', '#fff');
	}
};

module.exports = pianoRollController;
