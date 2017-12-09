const express = require('express');
const router = express.Router();
const jwt = require('./../../modulos/jwt');

//Rutas Definitivas
router.get('/buscarLogs', jwt, require('./buscarLogs'));

module.exports = router;