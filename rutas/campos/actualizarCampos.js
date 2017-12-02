const Async = require('async');
const CamposService = require('./../../servicios/campos');
const DocumentosService = require('./../../servicios/documentos');

//TODO: usar transacciones para las operaciones

/**
 * 
 * @param {*} req => documentoID, campos[]
 * @param {*} res 
 */
module.exports = (req, res) => {

    //Validacion
    if (!req.body.documento || !req.body.campos || !Array.isArray(req.body.campos)) {
        res.status(400).send({
            error: "¡Faltan Parametros!"
        });
        logger(req.timeInicioPeticion, 400, req.method, req.path, "¡Faltan Parametros!");
        return;
    }

    DocumentosService.comprobarExisteDocumentoPorId(req.body.documento)
        .then(documento => {

            //Comprobamos que existe el documento
            if (!documento) {
                var error = new Error("El documento no existe");
                error.status = 404;
                throw error;
            }

            //Array para guardar los campos que vamos a devolver
            let camposActualizados = new Array();

            Async.forEach(req.body.campos, (campo, i, callback) => {

                if(!campo._id) {
                    //Crear campo nuevo
                    CamposService.crearCampo(campo)
                    .then(campoDB => {
                        camposActualizados.push(campoDB);
                        callback();
                    })
                    .catch(error => {
                        //TODO: control de errores
                        callback();
                    });
                }

                CamposService.actualizarCampo(campo)
                .then (campoDB => {
                    camposActualizados.push(campoDB);
                    callback();
                })
                .catch (err => {
                    //TODO: control de errores
                    callback();
                });

            }, err => {
                console.log(err);
            });

            return camposActualizados;

        })
        .then(camposActualizados => {
            res.send(camposActualizados);
        })
        .catch(error => {
            //Mejorar!!!!!!!!!!!!!
            if (error.status) {
                res.status(error.status);
                res.send(error.message);
                logger(req.timeInicioPeticion, res.status, req.method, req.path, error.message);
                return;
            }
            res.send({
                error: error.message
            });

        });

}