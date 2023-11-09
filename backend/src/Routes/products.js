const express = require('express');
const router = express.Router();
// importar modelo de productos
const Productos = require('../models/productos');

router.get('/todos', async(req, res) => {
    try {
        const products = await Productos.find();
        res.json(products);
    } catch (error) {
        res.json({message: error});
    }
});

// crear un producto con POST (Nombre, Cantidad, Precio, Oferta, PrecioF, Tipo_Producto, CodigoBarras)
router.post('/nuevo', async(req, res) => {
    try {
        console.log(req.body);
        const product = new Productos({
            CodigoBarras: req.body.CodigoBarras,
            Nombre: req.body.Nombre,
            Cantidad: req.body.Cantidad,
            Precio: req.body.Precio,
            Oferta: req.body.Oferta,
            PrecioF: req.body.PrecioF,
            Tipo_producto: req.body.Tipo_producto, 
        });
        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.json({message: error});
    }
});


router.get('/codigo/:CodigoBarras', async(req, res) => {
    try {
        const product = await Productos.findOne({CodigoBarras: req.params.CodigoBarras});
        res.json(product);
    } catch (error) {
        res.json({message: error});
    }
});


module.exports = router;