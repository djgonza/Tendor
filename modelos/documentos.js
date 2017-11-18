const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Documentos', new Schema({

    nombre: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    }

}));