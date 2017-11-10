var Q = require('q');
var Debugger = require('middleware/Debugger');

var RoleModel = require('models/roles.model');
var PermisosModel = require('models/permisos.model');

module.exports = (nombreRol, accionPermiso) => {

	var deferred = Q.defer();

	//Busca en la base de datos el id del rol
	RoleModel.findOne({nombre: nombreRol}, {nombre: 0})
	.then(rol => {

		Debugger("fComprobarPermisos => DBRolId:".green, rol._id);
		
		//Buscamos el permiso
		PermisosModel.findOne({accion: accionPermiso})
		.then ((permiso) => {
			
			Debugger("fComprobarPermisos => DBPermisos:".green, permiso);

			//Comprovamos que el rol tiene ese permiso
			if (permiso.roles.indexOf(rol._id) == -1) {
				Debugger("fComprobarPermisos =>".green, "No Tiene Permiso".red);
				deferred.resolve(false);
			}

			Debugger("fComprobarPermisos =>".green, "Tiene Permiso".cyan);
			deferred.resolve(true);

		})
		.catch ((err) => {
			deferred.reject(err);
		});
	})
	.catch (err => {
		deferred.reject(err);
	});
	
	return deferred.promise;

}