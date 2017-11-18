var express = require('express');
var router = express.Router();
const jwt = require('./../../modulos/jwt');

//Rutas Definitivas
router.post('/crearTipoValor', jwt, require('./crearTipoValor'));

module.exports = router;