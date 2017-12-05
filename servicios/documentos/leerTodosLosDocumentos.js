const DocumentosModelo = require('./../../modelos/documentos');

module.exports = (idUsuario) => {

    return DocumentosModelo.find({ usuario: idUsuario });

}