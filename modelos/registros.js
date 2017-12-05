const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campo = new Schema({
    campo: {
        type: Schema.Types.ObjectId,
        ref: 'Campo',
        required: true
    },
    valor: {
        type: Schema.Types.Mixed,
        required: true
    }
});

module.exports = mongoose.model('Registros', new Schema({

    documento: {
        type: Schema.Types.ObjectId,
        ref: 'Documento',
        required: true
    },
    campos: {
        type: [campo],
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    eliminado: {
        type: Boolean,
        required: true,
        default: false
    } 

}));