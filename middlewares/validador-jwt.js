const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header("token");
    try {
        if (!token) {
            return res.status(401).json({
                msg: 'No estas autorizado por falta de el token'
            });
        }
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'No existe usuario en la BD'
            });
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Ya se ha eliminado al usuario de la BD'
            });
        }

         req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'No estas autorizado token invalido'
        });

    }

}

module.exports = {
    validarJWT
};