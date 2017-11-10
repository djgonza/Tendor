var colors = require('colors');
var debug = require('debug');
/*
	-- Tipo: define que parte de la app vamos a debuggear
	-- Titulo: Titulo del mensaje
	-- Mensage: Texto a mostar
*/

module.exports = (ruta, titulo, mensaje) => {

	var debug = require('debug')('App');
	if (!titulo) {
		debug(ruta);
		return;
	}
	if (!mensaje) {
		debug(ruta, titulo);
		return;
	}
	debug(ruta, titulo, mensaje);

}