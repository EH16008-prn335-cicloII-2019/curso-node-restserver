const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { rolValidador, emailValidador, idValidator } = require('../helpers/db-validador');
const { camposPost } = require('../middlewares/validador-campos');
const { validarJWT } = require('../middlewares/validador-jwt');
const { isAdmin } = require('../middlewares/validador-role');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'nombre obligatorio').not().isEmpty(),
    check('correo', 'El valor ingresado no es un correo valido').isEmail(),
    check('correo').custom(emailValidador),
    check('password', 'La contrasenia ingresada tiene que ser mayor de 6 caracteres').isLength({ min: 6 }),
    //check('rol','El Rol puede ser ADMIN_ROLE o USER_ROLE').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(rolValidador),
    camposPost
], usuariosPost);
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idValidator),
    check('rol').custom(rolValidador),
    camposPost
], usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/:id', [
    validarJWT,
     isAdmin,
    camposPost

], usuariosDelete);
module.exports = router;