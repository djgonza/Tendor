const CamposModelo = require('./../../modelos/campos');

module.exports = (campo) => {

    return new CamposModelo(campo).save();

} 