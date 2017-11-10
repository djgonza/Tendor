var express = require('express');
var router = express.Router();
var jwt = require('middleware/jwtComprobarToken');
var jwtCreate = require('middleware/jwtGenerarToken');
var Debugger = require('middleware/Debugger');
var colors = require('colors');

var ErrorGenerico = require('middleware/Errores/ErrorGenerico');
var ErrorConsultaDb = require('middleware/Errores/ErrorConsultaDb');

var Q = require('q'); //Eliminar

//Rutas Definitivas
router.post('/crear', require('routes/usuarios/nuevoUsuario'));

//Rutas
router.get('/', jwt, function(req, res, next) {

	Debugger('Token parseado => '.green, req.token);

	res.send({'title': 'Usuarios'});
	
	next();

});

router.get('/token', function(req, res, next) {

	var token = jwtCreate(12345);

	Debugger('Token generado: '.grey, token.green);

	res.send({
		'title': 'Usuarios',
		'token': token
	});
	
	next();

});

function pruebaDeep () {

	console.log(ErrorGenerico);

	var err = new ErrorGenerico("error lanzado en prueba Deep", 300);

	//throw err;

}

function prueba () {
	
	var deferred = Q.defer();

	pruebaDeep ();

	var err = new ErrorConsultaDb("error lanzado en prueba", 500);

	throw err;
	deferred.reject(err);
	
	return deferred.promise;
}

router.get('/error', function(req, res, next) {

	try {

		prueba()
		.then(a => {

		})
		.catch(err => {
			console.log("Error capturado en /error", err);
		});

		//var err = new Error("Error creado");
		//throw err;
		//next(err);

	}catch (err){
		if (err instanceof ErrorConsultaDb) {
			console.log("ErrorConsultaDb", err);
		}
		if (err instanceof ErrorGenerico) {
			console.log("ErrorGenerico", err);
		}
	}

});

module.exports = router;