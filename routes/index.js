var express = require('express');
var router = express.Router();

//Rutas Autentificacion
router.use('/autentificacion', require('routes/autenticacion'));
//Rutas Usuarios
router.use('/usuarios', require('routes/usuarios'));
//Rutas Gestion logs
router.use('/logs', require('routes/logger'));


module.exports = router;
