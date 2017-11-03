var jwt = require('jsonwebtoken');
var config = require('config.json');

module.exports = function (userId) {
	return jwt.sign({ id: userId }, config.secret);
}