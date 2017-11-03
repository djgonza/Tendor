var mongoose = require('mongoose');
var config = require('middleware/db-connection');

module.exports = function () {

	if () {
		
	}

	mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
	mongoose.Promise = require('q').Promise;

}