const { Router } = require("express");
const {check} = require('express-validator');
const { loginPost } = require("../controllers/auth");
const { camposPost } = require("../middlewares/validador-campos");
const router = Router();

router.post('/login',[
    check('correo','El Correo No es valido').isEmail(),
    check('password','Contrasenia requerida').not().isEmpty(),
    camposPost
],loginPost);

module.exports = router;