/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);


router.post('/', [
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login);

//validarJWT,
router.get('/renew',  validarJWT, renewToken);

module.exports = router;