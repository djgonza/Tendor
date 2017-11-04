var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var config = require('config.json');

module.exports = () => {

  let db = mongoose.connection;

  db.on('error', (err) => {
    console.log('MongoDb error: ', err);
  });

  db.once('open', () => {
    console.log("Conexion MongoDb abierta!");
  });

  db.once('close', () => {
    console.log("Conexio MongoDb cerrada!");
  });

  //Connect to the database
  //Check the ENV to node
  try {

    if(process.env.NODE_ENV == "production"){
      mongoose.connect(config.connectionString, {
        useMongoClient: true
      });
    }else{
      mongoose.connect(config.connectionStringLocal, {
        useMongoClient: true
      });
    }

  }catch (err){
    console.log("DB error: ", err);
    return;
  }

}