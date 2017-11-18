const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Campos', new Schema({

    nombre: {
        type: String,
        required: true
    },
    tipoValor: {
        type: Schema.Types.ObjectId,
        ref: 'TipoValores',
        required: true
    },
    documento: {
        type: Schema.Types.ObjectId,
        ref: 'Documentos',
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    }

}));