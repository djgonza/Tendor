var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UsuariosSchema = require('schemas/usuarios.schema');

module.exports = mongoose.model('usuarios', UsuariosSchema);