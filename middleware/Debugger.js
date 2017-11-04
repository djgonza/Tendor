var colors = require('colors');

/*
	-- Tipo: define que parte de la app vamos a debuggear
	-- Titulo: Titulo del mensaje
	-- Mensage: Texto a mostar
*/

module.exports = (titulo, mensaje, tipo) => {
	
	var debug = require('debug')(tipo ? tipo : 'App');
	if (mensaje) {
		debug(titulo, mensaje);
		return;
	}

	debug(titulo);

}