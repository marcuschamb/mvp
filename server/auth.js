/* Authentication module for ArcadeCityServer */
var facebook = require('./facebook');


var authenticate = function(req, res, next) {
  if (req.header('oauthToken') && req.header('oauthService')) {
    //console.log('we have oauthToken and oauthService available...');
    //console.log(req.header('oauthService'));
    //console.log(req.header('oauthToken'));
    switch(req.header('oauthService')) {
      case 'facebook':
        facebook.validateAndReadToken(req.header('oauthToken'))
        .then(function(result){
          console.log('USER AUTHENTICATED: ' + JSON.stringify(result));
        },function(error){
          console.log('** ERROR validating facebook token: ' + JSON.stringify(error));
        });
        break;
      default:
        console.log("** ERROR: Unknown oauthService: " + req.header('oauthService'));
        break;
    }

  } else {
    console.log('no token available... user is anonymous');
  }

  next();
};


exports.authenticate = authenticate;
