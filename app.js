require('rootpath')();
var express = require('express');
var path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('tendoserver:server');
var fs = require('fs');
var rfs = require('rotating-file-stream');
var http = require('http');

var routes = require('routes/index');
var normalizePort = require('middleware/normalize-port');
var onError = require('middleware/http-errors');

var logDirectory = 'logs';
var app = express();


// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// setup the logger
app.use(morgan(':date[clf] | :method | :url | :status | :response-time', {stream: accessLogStream}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//define all routes for service
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //Error Autorizacion
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Requiere Autorizacion!');
    next();
    return;
  }

  res.status(err.status || 500).send(err);

  debug('error', err);

});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

console.log("process", process, process.env.NODE_ENV);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Escuchando en ' + bind);
  if (process.env.PORT) {
    console.log('Escuchando en ' + bind);
  }
});
