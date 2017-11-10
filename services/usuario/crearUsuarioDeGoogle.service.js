var Q = require('q');
var Debugger = require('middleware/Debugger');
var UsuarioService = require('services/usuario');

module.exports = (nombre, email, rol, googleToken) => {

	var deferred = Q.defer();

	//Creamos el objeto con los datos del usuario
	var datos = {}
	datos.nombre = nombre;
	datos.email = email;
	datos.googleToken = googleToken;
	if(rol) datos.rol = rol;

	//Creamos el usuario
	UsuarioService.crearUsaurio(datos)
	.then (usuarioCreado => {
		deferred.resolve(usuarioCreado);
	});

	return deferred;

}