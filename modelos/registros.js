const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valor = new Schema({
    campo: {
        type: Schema.Types.ObjectId,
        ref: 'Campo',
        required: true
    },
    valor: {
        type: Schema.Types.Mixed,
        default: null
    }
});

module.exports = mongoose.model('Registros', new Schema({

    documento: {
        type: Schema.Types.ObjectId,
        ref: 'Documento',
        required: true
    },
    valores: {
        type: [valor],
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    eliminado: {
        type: Boolean,
        required: true,
        default: false
    } 

}));