var d3 = require('d3');
var varless = require('varless');

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
	/*
	this.svg.append('linearGradient')
		.attr('id', 'piano-roll-note-1')
		.attr('x1', '0%')
		.attr('y1', '0%')
		.attr('x2', '100%')
		.attr('y2', '0%')
		.selectAll('stop')
		.data([
			{ offset: '0%', color: varless.get('piano-roll-note-1') },
			{ offset: '100%', color: varless.get('piano-roll-note-1b') }
		])
		.enter()
		.append('stop')
		.attr('offset', function (d) { return d.offset; })
		.attr('stop-color', function (d) { return d.color; });
	*/
};

pianoRollController.prototype.render = function() {
	var self = this;

	var noteData = self.$scope.tokens.filter(function (token) {
		return token.type === 'note';
	});

	var scaleX = d3.scale.linear()
		.domain([0, d3.max(noteData, function (d) { return d.time + d.ticks; })])
		.range([0, self.element.offsetWidth]);
	var scaleY = d3.scale.ordinal()
		.domain(d3.range(
			d3.min(noteData, function (d) { return d.pitch; }),
			d3.max(noteData, function (d) { return d.pitch; }) + 1))
		.rangeBands([self.element.offsetHeight, 0]);

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
		g.attr('transform', function (d) { return 'translate(' + scaleX(d.time) + ',' + scaleY(d.pitch) + ')'; })
			.classed('piano-roll-note', true);
		g.append('rect')
			.attr('fill', varless.get('piano-roll-note-bg-1'))
			.attr('rx', varless.get('piano-roll-note-border-radius'))
			.attr('ry', varless.get('piano-roll-note-border-radius'));
		g.append('text')
			.text(function (d) { return self.midiNoteService.getNoteName(d.pitch); })
			.attr('fill', varless.get('piano-roll-note-color-1'))
			.style('dominant-baseline', 'central')
			.style('font-size', scaleY.rangeBand());
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
			.attr('x', 5)
			.attr('y', scaleY.rangeBand() / 2)
			.style('font-size', scaleY.rangeBand() * 0.75);
	}

	function notesExitTransition(g) {
		g.select('text')
			.style('fill', '#fff');
	}
};

module.exports = pianoRollController;
