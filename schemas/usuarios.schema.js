var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({

	nombre: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	rol: {
		type: Schema.Types.ObjectId,
		required: true,
		default: Schema.Types.ObjectId("59fda9d9b3f30704d81fc016")
	},
	contrasena: {
		type: String,
		default: null
	},
	googleToken: {
		type: String,
		default: null
	},
	fechaCreacion: {
		type: Date,
		required: true,
		default: Date.now
	}

});