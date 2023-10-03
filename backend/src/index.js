const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// aqui se conecta la bd con el backend
mongoose.connect(process.env.MONGO_CLUSTER, {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});