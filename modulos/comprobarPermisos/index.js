const Q = require('q');
const mongoose = require('mongoose');
const PermisosModelo = require('../../modelos/permisos');

module.exports = (permisoId) => {

    const deferred = Q.defer();

    //Buscamos el rol leerLogs
    PermisosModelo.find({
        "roles": mongoose.Types.ObjectId(permisoId)
        }).then(permisos => {
            
            //Comprovamos los permisos
            for (permiso in permisos) {
                //Tiene permiso
                if (permiso || permiso.accion == accion) {
                    deferred.resolve(true);
                    return;
                }
            }

            //No tiene permiso
            var error = new Error("No tienes permisos");
            error.status = 401;
            deferred.reject(error);
        });

    return deferred.promise;

}