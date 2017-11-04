var expressJwt = require('express-jwt');
var Debugger = require('middleware/Debugger');
var config = require('config.json');

module.exports = expressJwt({ 
	secret: config.secret,
	requestProperty: 'token',
	getToken: (req) => {

		if (req.headers.authorization) {
			return req.headers.authorization;
		} else if (req.query && req.query.oauth_token) {
			return req.query.oauth_token;
		}

		Debugger('Token'.green, '¡Falta Token!');

		return null;

	}
});