var restify = require('restify');
var fs = require('fs');
var q = require('q');
var config = require('./config');
var auth = require('./auth');

/****************************************/
/*** Setup and Authentication ***********/
/****************************************/
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
server.use(restify.CORS());
server.opts(/.*/, function (req,res,next) {
    res.header('Access-Control-Request-Headers', 'oauthToken, oauthService, Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'oauthToken, oauthService, Content-type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Expose-Headers', 'oauthToken, oauthService');
    res.send(200);
    return next();
});
server.use(auth.authenticate); // authenticate this request first

/****************************************/
/*** Core processing loop here **********/
/****************************************/
function send(req, res, next) {
  console.log('send says req.user = ' + JSON.stringify(req.user));
   if (req.user) {
     res.send('test ' + req.params.name + ' from user: ' + req.user.name);
   } else {
     res.send('test ' + req.params.name + ' from anonymous user');

   }
   return next();
 }

server.get('/test/:name', send);

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
