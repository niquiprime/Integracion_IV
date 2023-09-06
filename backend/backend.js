const express = require('express');
const mongoose = require('mongoose');

const app = express();

// aqui se conecta la bd con el backend
mongoose.connect('mongodb+srv://rodrigo:rodrigo@cluster0.5uf6hky.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// esto es para verificar que se conecta a la bd
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a la base de datos MongoDB');
});

// Define las rutas y todo lo otro aca

const port = 3000;
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});