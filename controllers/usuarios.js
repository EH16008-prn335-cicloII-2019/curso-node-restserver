const {request,response} = require('express');

const usuariosGet = (req = request,res=response) => {
    
    res.send('Request Successfully--Desde Controllers');
};
const usuariosPost = (req,res=response) =>{
    const {nombre,edad} = req.body;
    res.status(201).json({
        status:'ok',
        message:'Created Successfully--Desde Controllers',
        nombre,
        edad
    });
};
const usuariosPut = (req,res=response) =>{
    const {id} = req.params;
    const {nombre,hola} = req.query;
    res.status(201).json({
        status:'ok',
        message:'Updated Successfully--Desde Controllers',
        id,
        nombre,
        hola
    });
};
const usuariosPatch = (req,res=response) =>{
    res.status(201).json({
        status:'ok',
        message:'Patch Successfully--Desde Controllers'
    });
};
const usuariosDelete = (req,res=response) =>{
    res.status(201).json({
        status:'ok',
        message:'Deleted Successfully--Desde Controllers'
    });
};
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};