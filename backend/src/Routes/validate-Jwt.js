const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
    // Leer el token
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    // Validar el token
    try {
        const { uid } = jwt.verify(token, process.env.TOKEN_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

module.exports = validateJWT;