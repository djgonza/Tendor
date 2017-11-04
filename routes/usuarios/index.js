var express = require('express');
var router = express.Router();
var jwt = require('middleware/jwtComprobarToken');
var jwtCreate = require('middleware/jwtGenerarToken');
var Debugger = require('middleware/Debugger');
var colors = require('colors');

//Rutas
router.get('/', jwt, function(req, res, next) {

	Debugger('Token parseado => '.green, req.token);

	res.send({'title': 'Usuarios'});
	
	next();

});

router.get('/token', function(req, res, next) {

	var token = jwtCreate(12345678);

	Debugger('Token generado: '.grey, token.green);

	res.send({
		'title': 'Usuarios',
		'token': token
	});
	
	next();

});

router.get('/error', function(req, res, next) {

	Debugger('Error lanzado: '.red, 'Usuario Duplicado'.yellow);

	var err = new Error('Usuario duplicado');
	err.status = 409;
	next(err);

});

module.exports = router;