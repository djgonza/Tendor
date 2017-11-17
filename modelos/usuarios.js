var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


//Representa el squema de un usuario en la db
//El secret corresponde a la contraseña o al googleid
module.exports = mongoose.model('Usuarios', new Schema({

    nombre: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    rol: {
        type: Schema.Types.ObjectId,
        required: true
    },
    secret: {
        type: String,
        required: true,
        set: (value) => { return bcrypt.hashSync(value, 10); }
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    }

}));