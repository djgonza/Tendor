var Debugger = require('middleware/Debugger');

module.exports = () => {
	
	if (!process.env.PORT) {
		//debugear
		Debugger('¡Puerto no definido!'.red);
		process.exit();
		return;
	}

	return process.env.PORT;

}