const jwt = require('jsonwebtoken');
const generarJWT = (uid) => {
    return new Promise((resolve,reject) =>{
        const payload = {uid};
        const token = jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        }, (error,token) => {
            if (error) {
                console.log(err);
                reject('Error al generar el token');     
            } else {
                resolve(token);
            }
           
        })
    });
};

module.exports = {

    generarJWT
};