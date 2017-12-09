const RegistrosService = require('./../../servicios/registros');
const DocumentosService = require('./../../servicios/documentos');


//TODO: validar datos de req
module.exports = (req, res) => {

    //Validacion
    if (!req.body.registro) {
        res.status(400).send({
            error: "¡Faltan Parametros!"
        });
        return;
    }

    let registro = req.body.registro;

    DocumentosService.comprobarExisteDocumentoPorId(registro.documento)
        .then(documento => {

            if (!documento) {
                var error = new Error("El documento no existe");
                error.status = 401;
                throw error;
            }

            return documento;

        })
        .then(documento => {
            //Parseamos los datos
            let valores = new Array();
            registro.valores.map(campo => {
                let nuevoValor = {
                    campo: campo.campo,
                    valor: campo.valor
                }
                valores.push(nuevoValor);
            });
            return valores;
        })
        .then(valores => {

            registro.valores = valores;
            registro.usuario = req.token._id

            return RegistrosService.crearRegistro(registro);

        })
        .then(nuevoRegistro => {
            res.send(nuevoRegistro);
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