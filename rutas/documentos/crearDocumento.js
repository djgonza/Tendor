const DocumentosService = require('./../../servicios/documentos');

module.exports = (req, res) => {

    //Validacion
    if (!req.body.nombre) {
        res.status(400).send({
            error: "¡Faltan Parametros!"
        });
        return;
    }

    //Comprobamos que no existe el documento
    DocumentosService.comprobarExisteDocumentoPorNombre(req.body.nombre, req.token._id)
        .then(documento => {
            if (documento)  {
                var error = new Error("Documento ya existente");
                error.status = 401;
                throw error;
            }
            return;
        })
        .then(() => {
            
            //Crear Documento
            var documento = {
                nombre: req.body.nombre,
                usuario: req.token._id
            }

            //Guardamos el documento
            return DocumentosService.crearDocumento(documento);

        })
        .then(documento => {
            res.send(documento);
        })
        .catch(error => {
            //Mejorar!!!!!!!!!!!!!
            if(error.status) {
                res.status(error.status);
                res.send(error.message);
                return;
            }
            res.status(500).send({ message: "Error en el servidor" });

        });

}