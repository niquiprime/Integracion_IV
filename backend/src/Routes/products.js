/**
 * @swagger
 * components:
 *  schemas:
 *   Producto:
 *      type: object
 *      required:
 *          - CodigoBarras
 *          - Nombre
 *          - Cantidad
 *          - Precio
 *          - Oferta
 *          - PrecioF
 *          - Tipo_producto
 *      properties:
 *          id:
 *              type: string
 *              description: El id del producto
 *          CodigoBarras:
 *              type: number
 *              description: El codigo de barras del producto usado mayormente como el ID
 *          Nombre:
 *              type: string
 *              description: El nombre del producto
 *          Cantidad:
 *              type: number
 *              description: La cantidad del producto
 *          Precio:
 *              type: number
 *              description: El precio del producto
 *          Oferta:
 *              type: number
 *              description: La oferta del producto
 *          PrecioF:
 *              type: number
 *              description: El precio final del producto
 *          Tipo_producto:
 *              type: string
 *              description: El tipo de producto
 *          example:
 *              id: 60d8b1a3f9f0f60c6c2a4f6d
 *              CodigoBarras: 123456789
 *              Nombre: Ramen Instantaneo
 *              Cantidad: 10
 *              Precio: 1000
 *              Oferta: 10
 *              PrecioF: 900
 *              Tipo_producto: Comida
 */

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Productos
 *  description: El manejo de los productos
 * /api/producto/todos:
 *  get:
 *      summary: Retorna todos los productos requiere un token
 *      tags: [Productos]
 *      responses:
 *          200:
 *              description: La lista de productos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Producto'
 *
 * /api/producto/nuevo:
 *  post:
 *      summary: Crea un nuevo producto
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Producto'
 *      responses:
 *          200:
 *              description: El producto ha sido creado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Producto'
 * /api/producto/codigo/{CodigoBarras}:
 *  get:
 *      summary: Retorna un producto por su código de barras
 *      tags: [Productos]
 *      parameters:
 *          - in: path
 *            name: CodigoBarras
 *            schema:
 *              type: number
 *            required: true
 *            description: El código de barras del producto
 *      responses:
 *          200:
 *              description: El producto correspondiente al código de barras
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Producto'
 */

// importar modelo de productos
const Productos = require("../models/productos");

router.get("/todos", async (req, res) => {
  try {
    const products = await Productos.find();
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
});

// crear un producto con POST (Nombre, Cantidad, Precio, Oferta, PrecioF, Tipo_Producto, CodigoBarras)
router.post("/nuevo", async (req, res) => {
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
    res.json({ message: error });
  }
});

router.get("/codigo/:CodigoBarras", async (req, res) => {
  try {
    const product = await Productos.findOne({
      CodigoBarras: req.params.CodigoBarras,
    });
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
