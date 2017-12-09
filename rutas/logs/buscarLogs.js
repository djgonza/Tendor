const fs = require('fs');
const comprobarPermisos = require('./../../modulos/comprobarPermisos');
const accionPermisos = "LEER_LOGS";
const rutaCarpetaLogs = require('config.json').rutaCarpetaLogs;

module.exports = (req, res) => {

    //Comprobar tenemos permiso de admin
    comprobarPermisos(req.token.rol, accionPermisos)
        .then(permisos => {
            //Leer fichero logs del dia actual
            return leerLogs();
        })
        .then((logs) => {
            //Enviar logs
            res.send({logs: logs});
        })
        .catch(error => {
            res.status(error.status).send(error.message);
            logger(req.timeInicioPeticion, res.status, req.method, req.path, error.message);
        });

}

function leerLogs () {

    const fechaActual = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const rutaArchivoLogs =  rutaCarpetaLogs + fechaActual.split(" ")[0] + '.log';
    
    //Comprobamos si el fichero existe
    if (!fs.existsSync(rutaArchivoLogs))  {
        var error = new Error();
        error = new Error("Fichero no encontrado");
        error.status = 500;
        throw error;
    }

    return fs.readFileSync(rutaArchivoLogs, 'utf-8')
        .split('\n');

}