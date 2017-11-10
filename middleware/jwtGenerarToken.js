var jwt = require('jsonwebtoken');
var config = require('config.json');

module.exports = function (userId) {
	
	//Todo: sacar rol y demas info del usuario
	var userInfo = {
		id: userId,
		rol: "Admin"
	};

	return jwt.sign(userInfo, config.secret);
}