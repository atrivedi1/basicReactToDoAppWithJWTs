var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema ({
	deleted: Boolean,
	id: Number,
	description: String
});

module.exports = mongoose.model('tasks', userSchema);