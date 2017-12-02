const express = require('express');
const router = express.Router();
const jwt = require('./../../modulos/jwt');

//Rutas Definitivas
router.post('/crearCampo', jwt, require('./crearCampo'));
router.post('/leerCamposDeUnDocumento', jwt, require('./leerCamposDeUnDocumento'));
router.post('/actualizarCampos', jwt, require('./actualizarCampos'));

module.exports = router;