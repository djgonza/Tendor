const UsuariosModelo = require('./../../modelos/usuarios');

module.exports = (datosDelUsuario) => {

    return UsuariosModelo.create(datosDelUsuario);

} 