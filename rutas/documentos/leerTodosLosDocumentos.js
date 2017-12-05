const DocumentosService = require('./../../servicios/documentos');

module.exports = (req, res) => {

    DocumentosService.leerTodosLosDocumentos(req.token._id)
        .sort([
            ['fechaCreacion', '-1']
        ])
        .then(documentos => {
            res.send(documentos);
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