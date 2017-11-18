const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Registros', new Schema({

    campo: {
        type: Schema.Types.ObjectId,
        ref: 'Campos',
        required: true
    },
    valor: {
        type: Schema.Types.Mixed,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    }

}));