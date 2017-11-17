const RolesModelo = require('./../../modelos/roles');

module.exports = (nombreRol) => {

    return RolesModelo.findOne({ nombre: nombreRol });

} 