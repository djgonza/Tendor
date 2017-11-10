var Q = require('q');
var Debugger = require('middleware/Debugger');
var UsuarioService = require('services/usuario');

module.exports = (nombre, email, rol, contrasena) => {

	var deferred = Q.defer();

	//Creamos el objeto con los datos del usuario
	var datos = {}
	datos.nombre = nombre;
	datos.email = email;
	datos.contrasena = contrasena;
	if(rol) datos.rol = rol;

	console.log(UsuarioService);

	//Creamos el usuario
	UsuarioService.crearUsaurio(datos)
	.then (usuarioCreado => {
		Debugger("Usuario creado".green, usuarioCreado);
		deferred.resolve(usuarioCreado);
	});

	return deferred.promise;

}