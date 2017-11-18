const RegistrosModelo = require('./../../modelos/registros');

module.exports = (registros) => {

    return RegistrosModelo.create(registros);

}