/* Authentication module for ArcadeCityServer */



var authenticate = function(req, res, next) {
  if (req.header('oathToken') && req.header('oathService')) {
    console.log('we have oathToken and oathService available...');
  } else {
    console.log('no token available...');
  }

  next();
};


exports.authenticate = authenticate;
