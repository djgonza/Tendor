const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('TipoValores', new Schema({

    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
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