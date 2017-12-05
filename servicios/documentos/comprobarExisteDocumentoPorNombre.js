const DocumentosModelo = require('./../../modelos/documentos');

module.exports = (nombre, usuario) => {

    return DocumentosModelo.findOne({ nombre: nombre, usuario: usuario});

} 