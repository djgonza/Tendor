const fs = require('fs');
const rutaCarpetaLogs = require('config.json').rutaCarpetaLogs;

module.exports = (msInicioEjecucion, status, method, rute, result) => {

    try {

        const msEjecucion = new Date() - msInicioEjecucion;
        const fechaActual = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        //Si no existe creamos el directorio
        if (!fs.existsSync(rutaCarpetaLogs)) {
            fs.mkdirSync(rutaCarpetaLogs);
        }

        //Escribimos en el fichero
        var ficheroRuta = rutaCarpetaLogs + fechaActual.split(' ')[0] + ".log";
        var contenido = {
            "fecha": fechaActual,
            "status": status,
            "method": method,
            "rute": rute,
            "time": ('+' + msEjecucion + 'ms')
        }

        if (result) contenido.result = result;

        fs.appendFileSync(ficheroRuta, JSON.stringify(contenido) + '\n', 'utf8');

    } catch (error) {
        console.log('Error al escribir log', error);
    }

}