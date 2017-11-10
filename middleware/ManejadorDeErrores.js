var Debugger = require('middleware/Debugger');
var Logger = require('middleware/Logger');

module.exports = (err, req, res, next) => {

	var executeTime = Date.now() - req.start;
	var fecha = require('middleware/fechas').fechaActual();

	//console.log("err en manejador", err);

	Debugger(
		((err.status).toString()).red, 
		((err.message).toString()).yellow, 
		req.originalUrl
		);
	Logger(fecha, err.status, req.originalUrl, executeTime);
	res.status(err.status).send(err.message);

}