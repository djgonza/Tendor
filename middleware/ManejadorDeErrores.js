var Debugger = require('middleware/Debugger');
var Logger = require('middleware/Logger');

module.exports = (err, req, res, next) => {

	var executeTime = Date.now() - req.start;
	var fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

	switch (err.status) {
		case 404:
			Debugger('404'.red, '¡Servicio no encontrado!'.yellow);
			Logger(fecha, err.status, req.originalUrl, executeTime);
			res.status(404).send('¡Servicio no encontrado!');
			return;
		break;
		case 401:
			Debugger('401'.red, '¡Permiso denegado!'.yellow);
			Logger(fecha, err.status, req.originalUrl, executeTime);
			res.status(401).send('¡Permiso denegado!');
			return;
			break;
		case 409:
			Debugger('409'.red, '¡Conflicto!'.yellow);
			Logger(fecha, err.status, req.originalUrl, executeTime);
			res.status(409).send('¡Conflicto en la peticion!');
		return;
		break;
		default:
			Debugger('500'.red, err.stack);
			Logger(fecha, err.status, req.originalUrl, executeTime);
			res.status(500).send('¡Error desconocido!');
		return;

	}

}