const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let tareaSchema = new Schema({
	tarea: {
		type: String,
		required: [true, 'La tarea es requerida']
	},
	estado: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('Tarea', tareaSchema);