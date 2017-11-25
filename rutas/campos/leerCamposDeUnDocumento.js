const CamposService = require('./../../servicios/campos');
const DocumentosService = require('./../../servicios/documentos');

module.exports = (req, res) => {

    //Validacion
    if (!req.body.documento) {
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
            return CamposService.leerCamposDeUnDocumento(documento.id);

        })
        .then(campos => {
            //Comprobamos que no existe el Campo en ese documento
            if (!campos) {
                var error = new Error("No existen campos para este documento");
                error.status = 404;
                throw error;
            }

            res.send(campos);

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