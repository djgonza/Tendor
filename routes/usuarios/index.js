var express = require('express');
var router = express.Router();
var jwt = require('middleware/jwt-comprobar-token');
var jwtCreate = require('middleware/jwt-generar-token');

/*
 *  Rutas
 */

router.get('/', jwt, function(req, res, next) {
  
  //Resultado de procesar el token
  console.log('token', req.token);

  res.status(200).send({'title': 'Usuarios'});
});

router.get('/token', function(req, res, next) {
  res.status(200).send({
    'title': 'Usuarios',
    'token': jwtCreate(12345678)
  });
});

module.exports = router;