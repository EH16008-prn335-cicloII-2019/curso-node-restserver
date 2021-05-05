const bcrypt = require('bcryptjs');
const {request,response} = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request,res=response) => {
    const {desde = 0,hasta = 5} = req.query;
    const query = { estado:true };
    const [totalRegistros,registro] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(hasta))
    ]);
    res.status(200).json({
        totalRegistros,
        registro
        
    });
};
const usuariosPost = async(req = request,res=response) =>{
    //desestructoro lo que viene en la request.body
    const {nombre,correo,password,rol} = req.body;
    //se lo asigno a la instancia de Schema Usuario
    const usuario = new Usuario({
        nombre,correo,password,rol
    });
    //Encriptar la contrasenia
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);
    //Si todo salio bien almaceno el nuevo registro en la BD
    await usuario.save();
    res.status(201).json(usuario);
};
const usuariosPut = async(req=request,res=response) =>{
    //obtengo el id que me viene como parametro en la request
    const {id} = req.params;
    //Recojo los parametro a utilizar del body
        const {password,google,correo, ...userUpdate} = req.body;
        //Si la contra no viene vacio la encripto nuevamente
        if (password) {
            const salt = bcrypt.genSaltSync();
            userUpdate.password = bcrypt.hashSync(password,salt);
        }
        //Uso el metodo findByIdAndUpdate y actualizo pasando el id y la nueva informacion
        const usuario = await Usuario.findByIdAndUpdate(id,userUpdate);
        res.status(201).json(usuario);


};
const usuariosPatch = (req,res=response) =>{
    res.status(201).json({
        status:'ok',
        message:'Patch Successfully--Desde Controllers'
    });
};
const usuariosDelete = async(req = request,res=response) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id,{estado : false});
    const usuarioAutenticado = req.usuario;
    res.status(200).json(usuario);
};
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};