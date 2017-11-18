const DocumentosModelo = require('./../../modelos/documentos');

module.exports = (nombre) => {

    return DocumentosModelo.findOne({nombre: nombre});

} 