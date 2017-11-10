var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PermisosSchema = require('schemas/permisos.schema');

module.exports = mongoose.model('permisos', PermisosSchema);