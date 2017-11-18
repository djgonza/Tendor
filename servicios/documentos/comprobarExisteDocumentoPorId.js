const DocumentosModelo = require('./../../modelos/documentos');

module.exports = (id) => {

    return DocumentosModelo.findOne({ _id: id });

} 