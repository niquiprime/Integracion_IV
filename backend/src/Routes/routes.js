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

// crear un producto con POST (Nombre, Precio, Codigo_Barras)
router.post('/productos/nuevo', async(req, res) => {
    try {
        console.log(req.body);
        const product = new Productos({
            Nombre: req.body.Nombre,
            Precio: req.body.Precio,
            CodigoBarras: req.body.CodigoBarras,
        });
        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.json({message: error});
    }
});



// get usuario en especifico
router.get('/usuarios/:id', (req, res) => {
    res.send('Hola mundo, soy la ruta GET /usuarios/:id');
});

router.get('/productos/codigo/:CodigoBarras', async(req, res) => {
    try {
        const product = await Productos.findOne({CodigoBarras: req.params.CodigoBarras});
        res.json(product);
    } catch (error) {
        res.json({message: error});
    }
});


module.exports = router;