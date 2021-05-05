const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/generar-jwt');

const loginPost = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        //Verifico si el email existe en la BD
        const existeEmail = await Usuario.findOne({ correo });
        if (!existeEmail) {
            res.status(400).json({
                msg: 'correo o contrasenia invalida / correo no existe'
            });
        }

        //Verifico si el usuario sigue activo para ver si no se ha borrado
        if (existeEmail.estado===false) {
           res.status(400).json({
               msg:'Usuario Inactivo o eliminado'
           }); 
        }
        //Verifico la contrasenia
        const iguales = bcrypt.compareSync(password,existeEmail.password);
        if (!iguales) {
            res.status(400).json({
                msg:'correo o contrasenia invalida / contrasenia incorrecta'
            });
        }
        //Genero el JWT
        const token = await generarJWT(existeEmail.id);
        res.status(200).json({
            msg: 'ok',
            correo,
            password,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error del servidor / comunicarse con el admin'
        });

    }

};
module.exports = {
    loginPost
};