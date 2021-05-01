/*
    path: api/usuarios
*/

//const { validarCampos } = require('../middlewares/validar-campos');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios } = require('../controller/usuario');

const router = Router();

router.get('/', validarJWT, getUsuarios);


module.exports = router;