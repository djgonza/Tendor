const express = require('express');
const router = express.Router();
const jwt = require('./../../modulos/jwt');

//Rutas Definitivas
router.post('/crearDocumento', jwt, require('./crearDocumento'));
router.post('/actualizarDocumento', jwt, require('./actualizarDocumento'));
router.get('/leerTodosLosDocumentos', jwt, require('./leerTodosLosDocumentos'));

module.exports = router;