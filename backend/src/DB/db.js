const mongoose = require('mongoose');

require('dotenv').config();

const {MONGO_HOST, MONGO_USER, MONGO_PASS, MONGO_PRE, MONGO_DB_NAME } = process.env;
const MONGO_URI = `${MONGO_PRE}${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;



mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
  db.once('open', () => {
    console.log('Conectado a la base de datos MongoDB 🎉');
  });