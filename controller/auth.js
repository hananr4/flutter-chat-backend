const { response, request } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { Usuario } = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {


    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar mi JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            body: usuario,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'

        });
    }

};



const login = async (req, res = response) => {


    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no registrado'
            });
        }


        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no es válida '
            });
        }

        // Generar mi JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'

        });
    }

};

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
        return res.status(404).json({
            ok: false,
            msg: 'Usuario no existe'
        });
    }



    res.json({
        ok: true,
        usuario: usuarioDB,
        token: token
    });
};

module.exports = {
    crearUsuario,
    login,
    renewToken
};

