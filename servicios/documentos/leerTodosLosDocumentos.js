const DocumentosModelo = require('./../../modelos/documentos');
const CamposModelo =  require('./../../modelos/campos');

module.exports = (idUsuario) => {

    return DocumentosModelo.find({ usuario: idUsuario });

}