const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    tipoValor: {
        type: Schema.Types.ObjectId,
        ref: 'TipoValores',
        required: true
    }
});

module.exports = mongoose.model('Documentos', new Schema({

    nombre: {
        type: String,
        required: true
    },
    campos: {
        type: [campoSchema]
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
    eliminado:{
        type: Boolean,
        required: true,
        default: false
    } 

}));