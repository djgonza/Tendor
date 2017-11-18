const express = require('express');
const router = express.Router();
const jwt = require('./../../modulos/jwt');

//Rutas Definitivas
router.post('/crearRegistro', jwt, require('./crearRegistro'));

module.exports = router;