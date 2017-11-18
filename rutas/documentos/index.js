const express = require('express');
const router = express.Router();
const jwt = require('./../../modulos/jwt');

//Rutas Definitivas
router.post('/crearDocumento', jwt, require('./crearDocumento'));

module.exports = router;