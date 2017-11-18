const Type = require('type-of-is');
const CamposService = require('./../../servicios/campos');
const RegistrosService = require('./../../servicios/registros');

module.exports = (req, res) => {

    //Validacion
    if (!req.body.documento || !req.body.campo || !req.body.valor) {
        res.status(400).send({
            error: "¡Faltan Parametros!"
        });
        logger(req.timeInicioPeticion, 400, req.method, req.path, "¡Faltan Parametros!");
        return;
    }

    //Parsemos el valor para poder trabajar con el
    req.body.valor = JSON.parse(req.body.valor);

    CamposService.comprobarExisteCampoEnDocumento(req.body.campo, req.body.documento)
        .populate('documento', 'nombre')
        .populate('tipoValor', 'tipo')
        .then(campo => {

            //Comprobar existe ese campo
            if (!campo) {
                var error = new Error("El campo no existe");
                error.status = 401;
                throw error;
            }

            //Comprobar dato es del tipo del campo
            switch (campo.tipoValor.tipo) {
                case 'String':
                    if (!Type(req.body.valor, String)) {
                        var error = new Error("El tipo de dato de este registro no es valido");
                        error.status = 401;
                        throw error;
                    }
                    break;
                case 'Number':
                    if (!Type(parseInt(req.body.valor), Number)) {
                        var error = new Error("El tipo de dato de este registro no es valido");
                        error.status = 401;
                        throw error;
                    }
                    break;
                case 'Boolean':
                    if (!Type(req.body.valor, Boolean)) {
                        var error = new Error("El tipo de dato de este registro no es valido");
                        error.status = 401;
                        throw error;
                    }
                    break;
                default:
                    var error = new Error("El tipo de dato de este campo no existe");
                    error.status = 401;
                    throw error;
                    break;
            }

            return campo;
        })
        .then((campo) => {
            
            //Creamos el registro
            var registro = {
                campo: campo._id,
                valor: req.body.valor
            }
            return RegistrosService.crearRegistro(registro)
        })
        .then((registro) => {
            //enviamos el nuevo registro
            res.send(registro);
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