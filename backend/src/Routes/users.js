const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Usuarios = require('../models/usuarios');

// get usuario en especifico, decodificando el jwt que viene en el header
router.get('/get', async (req, res) => {
    try {
        const token = req.headers['auth-token'];
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        res.json(payload);
    } catch (error) {
        console.error("Error:", error);
        res.json({ message: error.message });
    }
});


//Get todos los usuarios
router.get('/todos', async(req, res) => {
    try {
        const usuarios = await Usuarios.find();
        res.json(usuarios);
    } catch (error) {
        res.json({message: error});
    }
});


module.exports = router;