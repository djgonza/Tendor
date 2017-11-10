var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RolesSchema = require('schemas/roles.schema');

module.exports = mongoose.model('roles', RolesSchema);