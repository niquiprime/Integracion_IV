/**
 *@swagger
 *components:
 *  schemas:
 *    Usuario:
 *      type: object
 *      required:
 *        - usuario
 *        - nombre
 *        - apellido
 *        - n_documento
 *        - email
 *        - password
 *        - fec_Nacimiento
 *        - admin
 *      properties:
 *        id:
 *          type: string
 *          description: El id del usuario
 *        usuario:
 *          type: string
 *          description: El nombre de usuario
 *        nombre:
 *          type: string
 *          description: El nombre del usuario
 *        apellido:
 *          type: string
 *          description: El apellido del usuario
 *        n_documento:
 *          type: string
 *          description: El numero de documento del usuario
 *        email:
 *          type: string
 *          description: El email del usuario
 *        password:
 *          type: string
 *          description: La contraseña del usuario
 *        fec_Nacimiento:
 *          type: string
 *          description: La fecha de nacimiento del usuario
 *        admin:
 *          type: boolean
 *          description: Si el usuario es admin o no
 *      example:
 *        id: 60d8b1a3f9f0f60c6c2a4f6d
 *        usuario: nicolas
 *        nombre: Nicolas
 *        apellido: Urrutia
 *        n_documento: 12345678-9
 *        email: email
 *        password: password
 *        fec_Nacimiento: 01-01-2000
 */
/**
 * @swagger
 * /api/usuario/get:
 *  get:
 *      summary: Retorna la información del usuario autenticado usando el token en el encabezado
 *      tags: [Usuarios]
 *      security:
 *        - BearerAuth: []
 *      responses:
 *          200:
 *              description: Información del usuario autenticado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Usuario'
 * /api/usuario/todos:
 *  get:
 *      summary: Retorna todos los usuarios
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: Lista de todos los usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Usuario'
 */
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Usuarios = require("../models/usuarios");

// get usuario en especifico, decodificando el jwt que viene en el header
router.get("/get", async (req, res) => {
  try {
    const token = req.headers["auth-token"];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    res.json(payload);
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: error.message });
  }
});

//Get todos los usuarios
router.get("/todos", async (req, res) => {
  try {
    const usuarios = await Usuarios.find();
    res.json(usuarios);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
