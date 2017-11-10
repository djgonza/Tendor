var Debugger = require('middleware/Debugger');
var Logger = require('middleware/Logger');

module.exports = (req, res, next) => {

	//Si nadie a contestado lanzamos error 404
	if (!res.finished) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
		return;
	}

	var executeTime = Date.now() - req.start;
	var fecha = require('middleware/fechas').fechaActual();

	//Capturador para debuguer y loguer
	switch (res.statusCode) {
		case 200:
			Debugger('200'.green, req.originalUrl.cyan);
			Logger(fecha, res.statusCode, req.originalUrl, executeTime);
			return;
		default:
			return;
	}

}