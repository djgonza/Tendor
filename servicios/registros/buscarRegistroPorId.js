const RegistrosModelo = require('./../../modelos/registros');

module.exports = (registroId) => {

    return RegistrosModelo.findOne({_id: registroId});

}