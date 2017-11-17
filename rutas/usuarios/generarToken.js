const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./../../config.json');
const UsuariosServicio = require('../../servicios/usuarios');
const logger = require('./../../modulos/logger');

module.exports = (req, res, next) => {

    //Comprovamos que estan los parametros necesarios
    if (!req.body.email || !req.body.secret) {
        res.status(400).send({
            error: "¡Faltan Parametros!"
        });
        logger(req.timeInicioPeticion, res.status || 500, req.method, req.path, "¡Faltan Parametros!");
        return;
    }

    UsuariosServicio.buscarUsuarioPorEmail(req.body.email, '_id email secret rol')
        //Usuario sacado de la db
        .then(usuario => {

            if (usuario && bcrypt.compareSync(req.body.secret, usuario.secret)) {
                
                //Eliminamos el secret para generar el token
                delete usuario._doc.secret;
                return jwt.sign(usuario._doc, config.jwtSecret);

            } else {
                var error = new Error("Usuario no encontrado");
                error.status = 401;
                throw error;
            }

        })
        //Token Generado
        .then (token => {
            console.log(token);
            res.send({token: token});
            logger(req.timeInicioPeticion, res.status, req.method, req.path, token);
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

};