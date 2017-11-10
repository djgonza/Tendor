var UsuariosModel = require('models/usuarios.model');

module.exports = (email) => {

	return UsuariosModel.findOne({email: email})
	.catch(err => {
		throw err;
	});

}