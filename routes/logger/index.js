var express = require('express');
var router = express.Router();

const readline = require('readline');
const fs = require('fs');
const logsRoute = 'logs/access.log';

/*
 *  Rutas
 */


//Muestra todos los logs
router.get('/', function(req, res, next) {

  let linesToSend = {lines: []};

  const rl = readline.createInterface({
    input: fs.createReadStream(logsRoute)
  });

  rl.on('line', function (line) {

    linesToSend.lines.push(line);

  }).on('close', () => {
    res.status(200).send(linesToSend);
  });
  
});

router.get('/console', function(req, res, next) {

  readline.createInterface({
    input: fs.createReadStream(logsRoute)
  }).on('line', function (line) {
    mostrarLogsEnConsola(line);
  }).on('close', () => {
    res.status(200).send('Mostrados en consola!');
  });

});

//Muestra los logs en consola
function mostrarLogsEnConsola (line) {
  line.split(' | ').map((val, i) => {
    switch (i) {
      case 0:
      console.log('Fecha:', '\x1b[2m', val, '\x1b[0m'); 
      break;
      case 1:
      console.log('Metodo: ', '\x1b[2m', val, '\x1b[0m'); 
      break;
      case 2:
      console.log('Url:','\x1b[36m', val, '\x1b[0m'); 
      break;
      case 3:
      switch (parseInt(val)){
        case 200:
        console.log('Codigo:','\x1b[32m', val, '\x1b[0m'); 
        break;
        case 401:
        console.log('Codigo:','\x1b[31m', val, '\x1b[0m');
        break;
        case 404:
        console.log('Codigo:','\x1b[33m', val, '\x1b[0m');
        break;
        case 500:
        console.log('Codigo:','\x1b[34m', val, '\x1b[0m');
        break;
        default:
        console.log('Codigo:','\x1b[35m', val, '\x1b[0m');
      }
      break;
      case 4:
      console.log('Tiempo Respuesta:','\x1b[2m', val, 'ms', '\x1b[0m'); 
      break;
    }
  });
  console.log('---------------------------------------------------');
}

module.exports = router;