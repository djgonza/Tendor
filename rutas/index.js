var express = require('express');
var router = express.Router();

//Rutas Usuarios
router.use('/usuarios', require('./usuarios'));
//Rutas Gestion logs
router.use('/logs', require('./logs'));
//Rutas Campos
router.use('/tipoValores', require('./tipoValores'));
//Rutas Documentos
router.use('/documentos', require('./documentos'));
//Rutas Campos
router.use('/campos', require('./campos'));
//Rutas Campos
router.use('/registros', require('./registros'));


module.exports = router;
