var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Roles', new Schema({

    nombre: {
        type: String,
        required: true
    }

}));