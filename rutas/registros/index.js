const express = require('express');
const router = express.Router();
const jwt = require('./../../modulos/jwt');

//Rutas Definitivas
router.post('/crearRegistro', jwt, require('./crearRegistro'));
router.post('/actualizarRegistro', jwt, require('./actualizarRegistro'));
router.post('/leerRegistrosPorDocumento', jwt, require('./leerRegistrosPorDocumento'));
router.post('/cantidadDeRegistrosPorDocumento', jwt, require('./cantidadDeRegistrosPorDocumento'));

module.exports = router;