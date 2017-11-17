require('rootpath')();
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const errores = require('./modulos/errores');
const rutas = require('./rutas');
const db = require('./modulos/mongodb');
const app = express();

//Declaramos el puerto
process.env.PORT = process.env.PORT || 3000;

//Calculo de tiempos de ejecucion
app.use((req, res, next) => {
    req.timeInicioPeticion = Date.now();
    next();
});

//parseo de peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Rutas
app.use(rutas);

//Error 404
app.use(errores.noEncontrado);

//Creacion e inicio del servicio
http.createServer(app).listen(process.env.PORT, () => {
    console.log("Servicio corriendo en el puerto ", process.env.PORT);
    //Iniciamos la conecion con la db
    db.connect();
});

//Creacion e inicio del servicio seguro
/*https.createServer(app).listen(process.env.PORT, () => {
    console.log("Servicio corriendo en el puerto ", process.env.PORT);
});*/

process.on('uncaughtException', (err) => {
    process.exit(1);
});