var express = require('express');
var router = express.Router();

//Rutas Definitivas
router.post('/registrar', require('./registrar'));
router.post('/generarToken', require('./generarToken'));

module.exports = router;