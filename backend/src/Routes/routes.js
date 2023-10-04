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
router.get('/productos/:id', async(req, res) => {
    try {
        const product = await Productos.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.json({message: error});
    }
});

// get usuario en especifico
router.get('/usuarios/:id', (req, res) => {
    res.send('Hola mundo, soy la ruta GET /usuarios/:id');
});

// Enviando un serial de codigo de barras, devolver el producto
router.get('/productos/codigo/:codigo', async(req, res) => {
    try {
        const product = await Productos.findOne({codigo: req.params.codigo});
        res.json(product);
    } catch (error) {
        res.json({message: error});
    }
});


module.exports = router;