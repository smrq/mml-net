var d3 = require('d3');
var varless = require('varless');

/* @ngInject */
function pianoRollController($scope, midiNoteService) {
	this.$scope = $scope;
	this.midiNoteService = midiNoteService;

	$scope.$watch('tokens', this.render.bind(this));
}

pianoRollController.prototype.init = function(element) {
	this.element = element;

	this.margin = 50;
	var width = this.element.offsetWidth - (2 * this.margin);
	var height = this.element.offsetHeight - (2 * this.margin);

	this.scaleX = d3.scale.linear();
	this.scaleY = d3.scale.ordinal();

	this.xAxis = d3.svg.axis()
		.scale(this.scaleX)
		.tickSize(height)
		.tickFormat(formatTicks);
	this.yAxis = d3.svg.axis()
		.scale(this.scaleY)
		.orient('left')
		.tickFormat(this.midiNoteService.getNoteName);

	this.svg = d3.select(element)
		.append('svg')
		.attr('width', element.offsetWidth)
		.attr('height', element.offsetHeight)
		.append('g')
		.attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
	this.svg.append('clipPath')
		.attr('id', 'clip')
		.append('rect')
		.attr('width', width)
		.attr('height', height);
	this.svg.append('g')
		.attr('class', 'x axis');
	this.svg.append('g')
		.attr('class', 'y axis');
	this.content = this.svg.append('g')
		.attr('class', 'content')
		.attr('clip-path', 'url(#clip)');
};

pianoRollController.prototype.render = function() {
	var self = this;

	var width = this.element.offsetWidth - (2 * this.margin);
	var height = this.element.offsetHeight - (2 * this.margin);

	var noteData = self.$scope.tokens.filter(function (token) {
		return token.type === 'note';
	});

	self.scaleX
		.domain([0, d3.max(noteData, function (d) { return d.time + d.ticks; })])
		.range([0, width]);
	self.scaleY
		.domain(d3.range(
			d3.min(noteData, function (d) { return d.pitch; }),
			d3.max(noteData, function (d) { return d.pitch; }) + 1))
		.rangeBands([height, 0]);

	self.svg
		.select('clipPath')
		.select('rect')
		.attr('width', width)
		.attr('height', height);

	self.svg
		.select('g.x.axis')
		.transition()
		.call(this.xAxis);
	self.svg
		.select('g.y.axis')
		.transition()
		.call(this.yAxis);

	var notes = self.content
		.selectAll('g.piano-roll-note')
		.data(noteData, function (d) { return JSON.stringify(d); });
	notes.enter()
		.append('g')
		.classed('piano-roll-note', true)
		.call(notesEnter)
		.transition()
		.call(notesEnterTransition);
	notes.transition()
		.call(notesUpdateTransition);
	notes.exit()
		.transition()
		.call(notesExitTransition)
		.remove();

	function notesEnter(g) {
		g.attr('transform', function (d) { return 'translate(' + self.scaleX(d.time) + ',' + self.scaleY(d.pitch) + ')'; });
		g.append('rect')
			.classed('piano-roll-note-border', true)
			.attr('fill', varless.get('piano-roll-note-border-1'))
			.attr('rx', varless.get('piano-roll-note-border-radius'))
			.attr('ry', varless.get('piano-roll-note-border-radius'));
		g.append('rect')
			.classed('piano-roll-note-fill', true)
			.attr('fill', varless.get('piano-roll-note-bg-1'))
			.attr('rx', varless.get('piano-roll-note-border-radius'))
			.attr('ry', varless.get('piano-roll-note-border-radius'));
		g.append('text')
			.text(function (d) { return self.midiNoteService.getNoteName(d.pitch); })
			.attr('fill', varless.get('piano-roll-note-color-1'))
			.style('dominant-baseline', 'central')
			.style('font-size', self.scaleY.rangeBand());
	}

	function notesEnterTransition(g) {
		g.styleTween('opacity', function () { return d3.interpolate(1e-6, 1); });
	}

	function notesUpdateTransition(g) {
		var innerHeight = self.scaleY.rangeBand() -
			parsePx(varless.get('piano-roll-note-border-top-width')) -
			parsePx(varless.get('piano-roll-note-border-bottom-width'));
		function innerWidth(d) {
			return self.scaleX(d.time + d.ticks) - self.scaleX(d.time) -
				parsePx(varless.get('piano-roll-note-border-left-width')) -
				parsePx(varless.get('piano-roll-note-border-right-width'));
		}

		g.attr('transform', function (d) { return 'translate(' + self.scaleX(d.time) + ',' + self.scaleY(d.pitch) + ')'; });
		g.select('rect.piano-roll-note-border')
			.attr('width', function (d) { return self.scaleX(d.time + d.ticks) - self.scaleX(d.time); })
			.attr('height', self.scaleY.rangeBand());
		g.select('rect.piano-roll-note-fill')
			.attr('x', varless.get('piano-roll-note-border-left-width'))
			.attr('y', varless.get('piano-roll-note-border-top-width'))
			.attr('width', innerWidth)
			.attr('height', innerHeight);
		g.select('text')
			.attr('x', parsePx(varless.get('piano-roll-note-border-left-width')) + parsePx(varless.get('piano-roll-note-text-padding-left')))
			.attr('y', parsePx(varless.get('piano-roll-note-border-top-width')) + innerHeight / 2)
			.style('font-size', innerHeight * 0.75);
	}

	function notesExitTransition(g) {
		g.style('opacity', 1e-6);
	}
};

function parsePx(px) {
	return parseInt(px, 10);
}

function formatTicks(ticks) {
	// todo: time signatures?
	var tpqn = 500; // todo: handle different tpqns
	var measure = 1 + Math.floor(ticks / (tpqn * 4));
	var beat = 1 + Math.floor((ticks % (tpqn * 4)) / tpqn);
	return measure + '.' + beat;
}

module.exports = pianoRollController;
