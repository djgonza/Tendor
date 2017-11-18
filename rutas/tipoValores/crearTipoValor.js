const TipoValoresModelo = require('./../../modelos/tipoValores');
const comprobarPermisos = require('./../../modulos/comprobarPermisos');
const accionPermisos = "CREAR_TIPO_VALOR";

module.exports = (req, res) => {

    //Validacion
    if (!req.body.nombre || !req.body.tipo) {
        res.status(400).send({
            error: "¡Faltan Parametros!"
        });
        logger(req.timeInicioPeticion, 400, req.method, req.path, "¡Faltan Parametros!");
        return;
    }

    //Comprobar tenemos permiso de admin
    comprobarPermisos(req.token.rol, accionPermisos)
        .then(permisos => {
            //Comprobar no existe ese tipo de valor
            return TipoValoresModelo.findOne({ nombre: req.body.nombre });
        })
        .then((tiposValores) => {
            
            //Ese tipo de valor ya existe
            if(tiposValores) {
                var error = new Error("Ese tipo de valor ya esta registrado")
                error.status = 401;
                throw error;
            }
            return;

        })
        .then(() => {

            //Insertamos el tipo de valor
            var tipoValor = {
                nombre: req.body.nombre,
                tipo: req.body.tipo,
                creadoPor: req.token._id
            }

            return TipoValoresModelo.create(tipoValor);

        })
        .then(tipoValor => {
            res.send(tipoValor);
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