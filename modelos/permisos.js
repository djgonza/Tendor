const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    creadoPor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    }

}));