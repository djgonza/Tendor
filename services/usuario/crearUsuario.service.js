var Debugger = require('middleware/Debugger');
var UsuariosModel = require('models/usuarios.model');

module.exports = (datosUsuario) => {

		Debugger("Datos Usuario:".green, datosUsuario);

	return UsuariosModel.create(datosUsuario)
	.catch(err => {
		Debugger("Error al crear el usuario".red, err)
		throw err;
	});

}