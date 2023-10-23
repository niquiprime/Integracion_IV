const express = require('express');
const router = express.Router();
// importar modelo de productos
const Productos = require('../models/productos');
const Usuarios = require('../models/usuarios');

router.get('/productos/todos', async(req, res) => {
    try {
        const products = await Productos.find();
        res.json(products);
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
router.get('/usuarios/rut/:n_documento', (req, res) => {
    try {
        const usuarios = Usuarios.findOne({n_documento: req.params.n_documento});
        res.json(usuarios);
    } catch (error) {
        res.json({message: error});
    }
});

//get todos los usuarios
router.get('/usuarios/todos', async(req, res) => {
    try {
        const usuarios = await Usuarios.find();
        res.json(usuarios);
    } catch (error) {
        res.json({message: error});
    }
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