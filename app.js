require('rootpath')();
var colors = require('colors');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var http = require('http');

var Debugger = require('middleware/Debugger');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Manejador de tiempos de peticiones
app.use(require('middleware/SetTiempoEjecucionPeticion'));

//Manejador de rutas
app.use('/', require('routes'));

//Control de status para debuguer y loguer
app.use(require('middleware/ManejadorDeStatus'));

//Control de errores generales
app.use(require('middleware/ManejadorDeErrores'));

//Iniciamos la aplicacion
var port = require('middleware/DefinirPuertos')();
app.listen(port, () => {

  Debugger('Servidor escuchando en el puerto: '.grey, port.green);
  console.log('Servidor escuchando en el puerto: '.grey, port.green);

  //Conexion a la DB
  //require('middleware/ConexionDB')();

});