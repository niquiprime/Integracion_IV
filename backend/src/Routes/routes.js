const express = require('express');
const router = express.Router();
// importar modelo de productos
const Productos = require('../models/productos');

router.get('/productos/todos', async(req, res) => {
    try {
        const products = await Productos.find();
        res.json(products);
    } catch (error) {
        res.json({message: error});
    }
});

// un producto en especifico
router.get('/productos/:id', (req, res) => {
    res.send('Hola mundo, soy la ruta GET /productos/:id');
});

// get usuario en especifico
router.get('/usuarios/:id', (req, res) => {
    res.send('Hola mundo, soy la ruta GET /usuarios/:id');
});

module.exports = router;