const Role = require('../models/role');
const Usuario = require('../models/usuario');
const rolValidador = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`Error el rol ${rol} que esta tratando de introducir no existe en la BD`);
    }
}
const emailValidador = async(correo = '') =>{
    const existeEmail = await Usuario.findOne({correo});
if (existeEmail) {
    throw new Error(`Error el email ${correo} que esta tratando de introducir ya existe en la BD`);
}
}
const idValidator = async(id) => {
    const idExiste = await Usuario.findById(id);
    if (!idExiste) {
        throw new Error(`Error el id ${id} no existe en la BD`);
    }
};



module.exports = {
    rolValidador,
    emailValidador,
    idValidator

};