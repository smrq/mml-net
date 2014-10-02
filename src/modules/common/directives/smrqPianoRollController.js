function pianoRollController($scope) {
	this.$scope = $scope;
	$scope.$watch('tokens', this.render.bind(this));
}

pianoRollController.prototype.init = function(element) {
	this.svg = d3.select(element)
		.append('div')
		.style('width', '100%');
};

pianoRollController.prototype.render = function() {
	var div = this.svg
		.selectAll('div')
		.data(this.$scope.tokens, function (d) { return tokenKey(d); });
	div.enter()
		.append('div')
		.text(function (d) { return d.pitch + ' @ ' + d.time; })
		.style('color', '#fff')
		.transition(1000)
		.style('color', '#000');
	div.exit()
		.transition(1000)
		.style('color', '#fff')
		.remove();
};

function tokenKey(token) {
	return JSON.stringify(token);
}

module.exports = pianoRollController;
