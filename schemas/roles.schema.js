var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({

	nombre: {
		type: String,
		required: true
	}

});