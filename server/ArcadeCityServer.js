var restify = require('restify');
var fs = require('fs');
var q = require('q');
var config = require('./config');
var auth = require('./auth');
var db = require('./db');

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
function ping(req, res, next) {
  res.send('pong');
}

function send(req, res, next) {
   if (req.user) {
     res.send('test ' + req.params.name + ' from user: ' + req.user.name);
   } else {
     res.send('test ' + req.params.name + ' from anonymous user');

   }
   return next();
 }

 function me(req, res, next) {
   if (req.user) {
     db.getDoc(req.user._id).then(function(doc){
       res.send(doc);
     })
     .catch(function(err){
       res.send({'error':err});
     });
   } else {
     res.send({'error':'no valid user'});
   }
 }

 function login(req, res, next) {
    if (req.user) {
      console.log('server login function recevied req.user:');
      console.log(req.user);
      db.getDoc(req.user._id).then(function(doc){
        doc.lastLogin = Math.round(+new Date()/1000); // unix timestamp
        db.saveDoc(doc).then(function(result){
          console.log('login saved... ' + JSON.stringify(result));
          //auth.js says req.user = {"name":"Mark Burggraf","email":"markb@mantisbible.com","_id":"facebook-10209104980366677","expiresAt":1459364536}
          res.send(doc);
          //res.send('OK');
        }).catch(function(err){
          console.log('login failed... ' + JSON.stringify(err));
          res.send({'error':err,'step':'save user'});
        });
      }).catch(function(err){
        if (err.status === 404) { // not found
          req.user.createdAt = Math.round(+new Date()/1000);
          req.user.lastLogin = req.user.createdAt;
          db.saveDoc(req.user).then(function(result){
            console.log('login user created... ' + JSON.stringify(result));
            res.send(req.user);
          }).catch(function(err){
            console.log('login user creation failed... ' + JSON.stringify(err));
            res.send({'error':err,'step':'create user'});
          });
        }
      });
    } else {
      res.send({'error':'no user sent','step':'receive user info'});
    }
    return next();
  }


server.get('/ping', ping);
server.get('/test/:name', send);
server.get('/login', login);
server.get('/me', me);


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
