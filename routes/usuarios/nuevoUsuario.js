var Debugger = require('middleware/Debugger');
var UsuarioService = require('services/usuario');

module.exports = (req, res, next) => {

	console.log(req.body, req.path);

	//Comprovamos que existe el nombre
	if(!req.body.nombre) {
		Debugger("/usuarios/nuevo =>".green, "Nombre no encontrado".red);
		var err = new Error("¡Faltan Parametros!");
		err.status = 400;
		next(err);
		return;
	}

	//Comprovamos que existe el email
	if(!req.body.email) {
		Debugger("/usuarios/nuevo =>".green, "Email no encontrado".red);
		var err = new Error("¡Faltan Parametros!");
		err.status = 400;
		next(err);
		return;
	}

	//comprovamos parametros que faltan
	if (!req.body.googleToken && !req.body.contrasena){
		Debugger("/usuarios/nuevo =>".green, "GoogleToken o Contraseña no encontrado".red);
		var err = new Error("¡Faltan Parametros!");
		err.status = 400;
		next(err);
		return;
	}

	try {

		UsuarioService.buscarUsuarioPorEmail (req.body.email)
		.then(usuario => {

			Debugger("Usuario Buscado:".green, usuario || "No encontrado".yellow);

			if (usuario) {
				var err = new Error("¡Usuario ya registrado!");
				err.status = 403;
				next(err);
				return;
			}

			//Usuario de google
			if (req.body.googleToken){
				
				Debugger("Registrar usuario por:".green, "GoogleToken".yellow);

				UsuarioService.crearUsuarioDeGoogle (req.body.nombre, req.body.email, req.body.rol, req.body.googleToken)
				.then(usuarioCreado => {
					Debugger("/usuarios/nuevo => ".green, "200".red, usuarioCreado);
					res.send(usuarioCreado);
					next();
				});

			}

			//Usuario con contraseña
			if (req.body.contrasena){
				
				Debugger("Registrar usuario por".green, "Contrasena".yellow);

				UsuarioService.crearUsuarioConContrasena (req.body.nombre, req.body.email, req.body.rol, req.body.contrasena)
				.then(usuarioCreado => {
					Debugger("/usuarios/nuevo => ".green, "200".red, usuarioCreado);
					res.send(usuarioCreado);
					next();
				});

			}

		});

	}catch (err) {

		Debugger("/usuarios/crear".red, err);
		var err = new Error("¡Error en el servidor!");
		err.status = 500;
		next(err);

	};

}