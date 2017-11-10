var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var config = require('config.json');
var Debugger = require('middleware/Debugger');

module.exports = () => {

  let db = mongoose.connection;

  db.once('error', (err) => {
    Debugger("ConexionDb.js =>".green,"¡Mongo db Error on!".red, err);
    //process.exit(1);
  });

  db.once('open', () => {
    Debugger("ConexionDb.js =>".green, "¡Conexion MongoDb abierta!".grey);
  });

  db.once('close', () => {
    Debugger("ConexionDb.js =>".green,"¡Conexio MongoDb cerrada!".green);
  });

  //Connect to the database
  //Check the ENV to node
  if(process.env.NODE_ENV == "production"){
    mongoose.connect(config.connectionString, {
      useMongoClient: true
    });
  }else{
    mongoose.connect(config.connectionStringLocal, {
      useMongoClient: true
    });
  }
  

}