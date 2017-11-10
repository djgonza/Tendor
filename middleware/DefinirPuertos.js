var Debugger = require('middleware/Debugger');

module.exports = () => {
	
	if (!process.env.PORT) {
		//debugear
		Debugger('¡Puerto no definido!'.red);
		process.exit(0);
		return;
	}

	return process.env.PORT;

}