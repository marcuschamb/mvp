var restify = require('restify');
var fs = require('fs');
var q = require('q');
var config = require('./config');

var server;
if (config.SSL) {
  // run in https mode
  server = restify.createServer({
    certificate: fs.readFileSync(config.SSLCert),
    key: fs.readFileSync(config.SSLKey),
    name: config.serverName
  });
} else {
  // run in http mode
  server = restify.createServer({
    name: config.serverName
  });
}

/****************************************/
/*** Core processing loop here **********/
/****************************************/




/****************************************/
/**** start server **********************/
/****************************************/

server.listen(config.serverPort);
console.log(config.serverName + ' listening on port ' + config.serverPort +
  ( config.SSL ? ' with SSL ON' : ' with SSL OFF' ));




/*

function send(req, res, next) {
   res.send('hello ' + req.params.name);
   return next();
 }

 server.post('/hello', function create(req, res, next) {
   res.send(201, Math.random().toString(36).substr(3, 8));
   return next();
 });
 server.put('/hello', send);
 server.get('/hello/:name', send);
 server.head('/hello/:name', send);
 server.del('hello/:name', function rm(req, res, next) {
   res.send(204);
   return next();
 });

*/
