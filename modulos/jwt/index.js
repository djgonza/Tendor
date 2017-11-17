var jwt = require('jsonwebtoken');
var config = require('./../../config.json');

module.exports = (req, res, next) => {

    jwt.verify(req.headers.authorization, config.jwtSecret, (err, decoded) => {
        //Si no hay token mandamos error
        if (err) {
            console.log(err);
            res.status(401).send("Falta autorización");
            return;
        }
        //Si es correcto el token añadimos la informacion al req
        req.token = decoded;
        next();
    });
    
}