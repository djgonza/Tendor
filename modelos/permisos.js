var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Permisos', new Schema({

    accion: {
        type: String,
        required: true
    },
    permiso: {
        type: Boolean,
        required: true
    },
    roles: {
        type: Array,
        required: true
    }

}));