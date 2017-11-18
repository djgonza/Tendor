const CamposService = require('./../../servicios/campos');
const DocumentosService = require('./../../servicios/documentos');

module.exports = (req, res) => {

    //Validacion
    if (!req.body.nombre || !req.body.tipoValor || !req.body.documento) {
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

            //Buscamos el campo en el documento
            return CamposService.comprobarExisteCampoEnDocumento(req.body.nombre, req.body.documento);

        })
        .then(campo => {
            //Comprobamos que no existe el Campo en ese documento
            if (campo) {
                var error = new Error("Campo ya existente en este documento");
                error.status = 401;
                throw error;
            }
        })
        .then(() => {

            //Crear Campo
            var campo = {
                nombre: req.body.nombre,
                tipoValor: req.body.tipoValor,
                documento: req.body.documento
            }

            //Guardamos el campo
            return CamposService.crearCampo(campo)

        })
        .then(campo => {
            res.send(campo);
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