const { response, request } = require("express");

const isAdmin = (req = request,res = response,next) =>{
    if(!req.usuario){
        return res.status(500).json({
            msg:'Estoy intentando evaluar primero el rol antes que mi token'
        });
    }
    const { rol,nombre} = req.usuario;
    if (rol!=='ADMIN_ROLE') {
        return res.status(401).json({
            msg:`${nombre} - No eres un administrador entonces no tienes permisos necesarios`
        });
    }
    next();
}
module.exports = {isAdmin};