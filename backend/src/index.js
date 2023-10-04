const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

require('./DB/db');

// Define las rutas y todo lo otro aca
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});



//Routes
app.use('/api', require('./Routes/routes'));
app.use(cors());
app.use(express.json());
