const RegistrosService = require('./../../servicios/registros');
const DocumentosService = require('./../../servicios/documentos');

module.exports = (req, res) => {

    //Validacion
    if (!req.body.documento) {
        res.status(400).send({
            error: "¡Faltan Parametros!"
        });
        return;
    }


    DocumentosService.comprobarExisteDocumentoPorId(req.body.documento)
        .then(documento => {

            if (!documento) {
                var error = new Error("El documento no existe");
                error.status = 401;
                throw error;
            }

            return documento;

        })
        .then(documento => {
            let skip = req.body.skip ? req.body.skip : 0;
            let limit = req.body.limit ? req.body.limit : 20;
            return RegistrosService.buscarRegistrosPorDocumento(documento._id, skip, limit)
        })
        .then(registros => {
            res.send(registros);
        })
        .catch(error => {
            //Mejorar!!!!!!!!!!!!!
            if (error.status) {
                res.status(error.status);
                res.send(error.message);
                return;
            }
            res.send({
                error: error.message
            });

        });

}