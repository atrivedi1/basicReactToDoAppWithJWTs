var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema ({
	id: Number,
	completed: Boolean,
	description: String
});

module.exports = mongoose.model('tasks', taskSchema);