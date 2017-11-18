const CamposModelo = require('./../../modelos/campos');

module.exports = (nombre, documento) => {

    return CamposModelo.findOne({ nombre: nombre, documento: documento });

} 