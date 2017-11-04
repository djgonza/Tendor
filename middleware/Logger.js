var fs = require('fs');
var config = require('config.json');
var Debugger = require('middleware/Debugger');
var colors = require('colors');

module.exports = (fecha, status, msj, ms) => {

	//Si no existe creamos el directorio
	if (!fs.existsSync(config.logsPath)) {
		fs.mkdirSync(config.logsPath);
	}

	//Escribimos en el fichero
	var ruta = config.logsPath + fecha.split(' ')[0];
	var contenido = {
		"fecha": fecha,
		"status": status,
		"msj": msj,
		"time": ('+' + ms + 'ms')
	}

	fs.appendFile(ruta, JSON.stringify(contenido) + '\n', 'utf8', (err) => {
		if (err) Debugger('!Error al guardar log!'.red, err);
	});

}