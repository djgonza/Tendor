var express = require('express');
var router = express.Router();

//Rutas Usuarios
router.use('/usuarios', require('./usuarios'));
//Rutas Gestion logs
router.use('/logs', require('./logs'));


module.exports = router;
