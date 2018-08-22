require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//IMPORTAMOS EL ARCHIVO DE LAS RUTAS
app.use(require('./routes/index'));

//CARPETA PÚBLICA
app.use(express.static(__dirname + '/public/'));

//CONEXION A LA DB
mongoose.connect('mongodb://localhost:27017/tareas', { useNewUrlParser: true }, (err) => {
	if(err) throw Error;
	console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
	console.log('servidor corriendo en el puerto: ', process.env.PORT);
});