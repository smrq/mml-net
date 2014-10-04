'use strict';

/* @ngInject */
function MidiNoteService() {}

MidiNoteService.prototype.getNoteName = function (pitch) {
	var mapping = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	return mapping[pitch % 12];
};

MidiNoteService.prototype.getNoteColor = function (pitch) {
	var mapping = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
	return mapping[pitch % 12];
};

module.exports = MidiNoteService;
