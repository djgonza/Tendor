var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var config = require('./../../config.json');

module.exports.connect = () => {

    
    //Eventos de la db
    mongoose.connection.on('open', () => {
        console.log("Conexion con db abierta");
    });

    mongoose.connection.on('error', (err) => {
        console.log("Error en la db", err);
        throw err;
    });

    mongoose.connection.on('close', () => {
        console.log("Conexion con db cerrada");
    });

    var connectionString;

    //Conexion a la db dependiendo del ambito de despliegue
    if (process.env.NODE_ENV == "production") {
        connectionString = config.connectionString;
    } else {
        connectionString = config.connectionStringLocal;
    }

    mongoose.connect(connectionString, {
        useMongoClient: true
    });

}
