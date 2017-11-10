var express = require('express');
var router = express.Router();
var colors = require('colors');
var config = require('config.json');
var jwt = require('middleware/jwtComprobarToken');
var Debugger = require('middleware/Debugger');
var fechas = require('middleware/fechas');

var ComprobarPermisos = require('middleware/ComprobarPermisos');

//TODO: ruta para pedir logs por fecha

//Rutas
router.get('/', jwt, function(req, res, next) {

	//Comprovamos si tiene permisos
	ComprobarPermisos(req.token.rol, "LEER_LOGS")
	.then(validador => {

		validador = null;

		//No tiene permisos
		if (!validador) {
			//throw CrearError("No tienes permisos", 401);
		}

		Debugger("/logs =>".green, "Tienes permisos".cyan);

		//Leer logs de dia actual
		var logs = [];
		var fechaActual = fechas.fechaActual().split(' ')[0];
		var rutaArchivoLogs = config.logsPath + fechaActual + ".log";
		const readline = require('readline');
		const fs = require('fs');

		//Comprobamos si el fichero existe
		if (!fs.existsSync(rutaArchivoLogs)) {
			Debugger("/logs =>".green, ("El fichero no existe: " + rutaArchivoLogs).red,  err);
			//next(CrearError("Fichero no encontrado", 500));
			return;
		}

		//Creamos el lector
		const rl = readline.createInterface({
			input: fs.createReadStream(rutaArchivoLogs)
		});
		rl.on('line', (line) => {
			logs.push(line);
		});
		rl.on('close', () => {
			//Enviar json array logs
			res.send({logs: logs});
			next();
		});

	})
	.catch(err => {
		next(err);
	});

});

module.exports = router;