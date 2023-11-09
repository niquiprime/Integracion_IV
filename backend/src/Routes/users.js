const express = require('express');
const router = express.Router();

const Usuarios = require('../models/usuarios');

//validaciones
const Joi = require('@hapi/joi');

//encriptar contraseña
const bcrypt = require('bcrypt');

//JWToken
const jwt = require('jsonwebtoken');

const schemaRegister = Joi.object({
    usuario: Joi.string().required(),
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    n_documento: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    fec_Nacimiento: Joi.string().required(),
    admin: Joi.boolean().required()
});

const schemaLogin = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});


// get usuario en especifico
router.get('/:n_documento', (req, res) => {
    try {
        const usuarios = Usuarios.findOne({n_documento: req.params.n_documento});
        res.json(usuarios);
    } catch (error) {
        res.json({message: error});
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

//Register
router.post('/nuevo', async(req, res) => {
    try {
        
        //validaciones
        const { error } = schemaRegister.validate(req.body);
        if (error) return res.status(400).json({ error: true, message: error.details[0].message });

        //verificar si el email, usuario o n_documento ya existe
        const isEmailUserN_documentoExist = await Usuarios.findOne({
            $or: [
                { email: req.body.email },
                { usuario: req.body.usuario },
                { n_documento: req.body.n_documento }
            ]
        });
        if (isEmailUserN_documentoExist) return res.status(400).json({ error: true, message: 'El usuario ya existe' });

        //hash pass
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const usuario = new Usuarios({
            usuario: req.body.usuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            n_documento: req.body.n_documento,
            email: req.body.email,
            password,
            fec_Nacimiento: req.body.fec_Nacimiento,
            admin: req.body.admin
        });
        const savedUser = await usuario.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.json({message: error});
    }
});

//Login
router.post('/login', async(req, res) => {
    try {
        //validaciones
        const { error } = schemaLogin.validate(req.body);
        if (error) return res.status(400).json({ error: true, message: error.details[0].message });

        //verificar si el email existe
        const user = await Usuarios.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: true, message: 'Usuario no encontrado' });

        //verificar pass
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).json({ error: true, message: 'Contraseña invalida' });

        //crear token
        const token = jwt.sign({
            usuario: user.usuario,
            id: user._id
        }, process.env.TOKEN_SECRET);

        res.header('auth-token', token).json({
            error: null,
            data: { token }
        });

    } catch (error) {
        res.status(400).json({ error: true, message: error });
    }
});

module.exports = router;