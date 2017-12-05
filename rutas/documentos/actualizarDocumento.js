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

    //Comprobamos que no existe el documento
    DocumentosService.comprobarExisteDocumentoPorId(req.body.documento._id, req.token._id)
        .then(documentoDB => {
            if (!documentoDB) {
                var error = new Error("Documento no encontrado");
                error.status = 404;
                throw error;
            }
            return documentoDB;
        })
        .then((documentoDB) => {

            let documento = req.body.documento;
            documentoDB.set({ nombre: documento.nombre });
            documentoDB.set({ campos: documento.campos });

            return documentoDB.save();

        })
        .then(documento => {
            res.send(documento);
        })
        .catch(error => {
            //Mejorar!!!!!!!!!!!!!
            if (error.status) {
                res.status(error.status);
                res.send(error.message);
                logger(req.timeInicioPeticion, res.status, req.method, req.path, error.message);
                return;
            }
            res.send({});

        });

}