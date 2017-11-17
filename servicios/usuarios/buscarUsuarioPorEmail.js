const UsuariosModelo = require('./../../modelos/usuarios');

module.exports = (email, propiedadesDevolver) => {

    return UsuariosModelo.findOne({ email: email }, propiedadesDevolver);

} 