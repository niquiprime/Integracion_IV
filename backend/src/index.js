const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

require('./DB/db');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});

// Capturar body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route middlewares
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    });
});

// Routes: quiero agregar /api/products y /api/users
const productsRouter = require('./Routes/products');
const usersRouter = require('./Routes/users');
const loginRegisterRouter = require('./Routes/login-register');
const validateJWT = require('./Routes/validate-Jwt');

//app.use('/api/producto',validateJWT, productsRouter);
app.use('/api', loginRegisterRouter);
app.use('/api/producto', validateJWT, productsRouter);
app.use('/api/usuario', validateJWT, usersRouter);


// CORS
app.use(cors());
