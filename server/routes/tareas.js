const express = require('express');
const app = express();

const Tarea = require('../models/tareas');

//Método para obtener todas las tareas
app.get('/tarea', (req, res) => {
	Tarea.find({estado:true})
		.exec((err, tareas) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
			
			Tarea.countDocuments({ estado: true }, (err, total) => {
				if(err) throw Error
				res.json({tareas, total});
			});
		});
});

//Metodo para agregar una tarea
app.post('/tarea', (req, res) => {
	let body = req.body;

	let tarea = new Tarea({
		tarea: body.tarea,
		estado: body.estado
	});

	tarea.save((err, tareaDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			tarea: tareaDB
		});
	});
});

//Metodo para actualizar tarea
app.put('/tarea/:id', (req, res) => {
	let id = req.params.id;
	let body = req.body;

	Tarea.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, tareaDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			tarea: tareaDB,
			message: 'Tarea actualizada'
		})
	});
});

//Metodo para eliminar tarea
app.delete('/tarea/:id', (req, res) => {
	let id = req.params.id;

	Tarea.findByIdAndRemove(id, (err) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			message: 'Tarea eliminada'
		});
	});
});

// function error(err) {
// 	if (err) {
// 		return res.status(400).json({
// 			ok: false,
// 			err
// 		});
// 	}
// }

module.exports = app;