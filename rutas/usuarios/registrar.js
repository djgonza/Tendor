const UsuariosServicio = require('../../servicios/usuarios');
const RolesServicio = require('../../servicios/roles');
const logger = require('./../../modulos/logger');

module.exports = (req, res, next) => {

    //Comprovamos que estan los parametros necesarios
    if (!req.body.email || !req.body.secret) {
        res.status(400).send({
            error: "¡Faltan Parametros!"
        });
        logger(req.timeInicioPeticion, 400, req.method, req.path, "¡Faltan Parametros!");
        return;
    }

    //Comprovamos el email
    UsuariosServicio.buscarUsuarioPorEmail(req.body.email, 'email')
        .then(email => {

            if (email) {
                var error = new Error("Usuario ya registrado");
                error.status = 401;
                throw error;
            }
            return;

        })
        .then(() => {

            //Datos del Usuario
            var datosUsuario = {
                email: req.body.email,
                secret: req.body.secret
            };

            //Definimos el rol
            if (req.body.rol) {
                datosUsuario.rol = req.body.rol;
            } else {

                //Buscamos el rol de usuario
                return RolesServicio.buscarRol("Usuario")
                    .then(rolUsuario => {

                        if (!rolUsuario) {
                            var error = new Error("¡Rol usuario no encontrado!");
                            error.status = 500;
                            throw error;
                        }
                        datosUsuario.rol = rolUsuario.id;

                    });

            }

            return datosUsuario;

        })
        .then((datosUsuario) => {

            //Registrar Usuario
            return UsuariosServicio.registrarUsuario(datosUsuario)
                .then(usuarioRegistrado => {
                    return usuarioRegistrado;
                });

        })
        .then((usuarioRegistrado) => {

            res.send(usuarioRegistrado);
            logger(req.timeInicioPeticion, res.status, req.method, req.path, usuarioRegistrado);

        })
        //Capturamos errores generales
        .catch(error => {

            console.log(error);
            error.status ? res.status(error.status) : res.status(500);
            res.send({
                error: error.message
            });
            logger(req.timeInicioPeticion, res.status, req.method, req.path, error.message);

        });


}