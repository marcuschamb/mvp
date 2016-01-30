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
          //console.log('USER AUTHENTICATED: ' + JSON.stringify(result));
          req.user = {};
          req.user.providerInfo = {};
          req.user.providerInfo.provider = req.header('oauthService');
          req.user.providerInfo.name = result.name;
          req.user.providerInfo.email = result.email;
          req.user.providerInfo.expiresAt = result.expiresAt;
          req.user._id = 'facebook-' + result.id;
          //console.log('auth.js says req.user = ' + JSON.stringify(req.user));
          next();

          //USER AUTHENTICATED: {"name":"Mark Burggraf","id":"10209057040048199","email":"markb@mantisbible.com","secondsToExpiration":5173606,"isValid":true,"expiresAt":1459096155,"isExpired":false}

        },function(error){
          console.log('** ERROR validating facebook token: ' + JSON.stringify(error));
          next();
        });
        break;
      default:
        console.log("** ERROR: Unknown oauthService: " + req.header('oauthService'));
        next();
        break;
    }

  } else {
    console.log('no token available... user is anonymous');
    next();
  }

  //next();
};


exports.authenticate = authenticate;
