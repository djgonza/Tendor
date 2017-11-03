var express = require('express');
var router = express.Router();

//Rutas Autentificacion
router.use('/autentificacion', require('routes/autenticacion/index'));
//Rutas Usuarios
router.use('/usuarios', require('routes/usuarios/index'));
//Rutas Logger
router.use('/logger', require('routes/logger/index'));


module.exports = router;
