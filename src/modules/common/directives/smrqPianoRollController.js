var d3 = require('d3');

function pianoRollController($scope, midiNoteService) {
	this.$scope = $scope;
	this.midiNoteService = midiNoteService;

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
	var self = this;

	var noteData = self.$scope.tokens.filter(function (token) {
		return token.type === 'note';
	});

	var margin = 10;

	var scaleX = d3.scale.linear()
		.domain([0, d3.max(noteData, function (d) { return d.time + d.ticks; })])
		.range([margin, self.element.offsetWidth - margin]);
	var scaleY = d3.scale.ordinal()
		.domain(d3.range(
			d3.min(noteData, function (d) { return d.pitch; }),
			d3.max(noteData, function (d) { return d.pitch; }) + 1))
		.rangeBands([self.element.offsetHeight - margin, margin]);

	var notes = self.svg
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
		g.attr('transform', function (d) { return 'translate(' + scaleX(d.time) + ',' + scaleY(d.pitch) + ')'; });
		g.append('rect');
		g.append('text')
			.text(function (d) { return self.midiNoteService.getNoteName(d.pitch); })
			.style('dominant-baseline', 'central')
			.style('font-size', scaleY.rangeBand())
			.attr('fill', '#fff');
	}

	function notesEnterTransition(g) {
		g.styleTween('fill', function () { return d3.interpolate('#fff', '#000'); });
	}

	function notesUpdateTransition(g) {
		g.attr('transform', function (d) { return 'translate(' + scaleX(d.time) + ',' + scaleY(d.pitch) + ')'; });
		g.select('rect')
			.attr('width', function (d) { return scaleX(d.time + d.ticks) - scaleX(d.time); })
			.attr('height', scaleY.rangeBand());
		g.select('text')
			.attr('y', scaleY.rangeBand() / 2)
			.style('font-size', scaleY.rangeBand());
	}

	function notesExitTransition(g) {
		g.select('text')
			.style('fill', '#fff');
	}
};

module.exports = pianoRollController;
