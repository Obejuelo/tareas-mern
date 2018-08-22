const express = require('express');
const app = express();

app.use(require('./tareas'));

module.exports = app;