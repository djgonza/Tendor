const DocumentosModelo = require('./../../modelos/documentos');

module.exports = (documento) => {

    return DocumentosModelo.create(documento);

} 