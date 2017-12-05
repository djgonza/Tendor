const RegistrosModelo = require('./../../modelos/registros');

module.exports = (documentoId) => {

    return RegistrosModelo.count({ documento: documentoId });

}