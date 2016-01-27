var request = require('request'); // http request library
var q = require('q'); // promises library
var config = require('./config');
var FBURL = 'https://graph.facebook.com/v2.5/';

var validateToken = function(token) {
  var deferred = q.defer();

  request(FBURL + 'debug_token?access_token=' + config.FBclientID + '|' + config.FBclientSecret + '&input_token=' + token,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body); // Show the HTML for the Google homepage.
      var validationObject = JSON.parse(body);
      var secondsToExpiration = (parseInt(validationObject.data.expires_at,10) - parseInt(new Date().valueOf() / 1000,10));
      var isValid = validationObject.data.is_valid;
      var expiresAt = validationObject.data.expires_at;
      var userID = validationObject.data.user_id;
      var isExpired = (secondsToExpiration <= 0);
      /*
      console.log('is_valid: ' + validationObject.data.is_valid);
      console.log('expires_at: ' + validationObject.data.expires_at);
      console.log('user_id: ' + validationObject.data.user_id);
      console.log(secondsToExpiration + ' seconds to expiration');
      console.log('expired? ' + isExpired);
      */
      var returnObj = {
        secondsToExpiration: secondsToExpiration,
        isValid: isValid,
        expiresAt: expiresAt,
        userID: userID,
        isExpired: isExpired
      };
      if (isValid && !isExpired) {
        deferred.resolve(returnObj);
      } else {
        deferred.reject(returnObj);
      }
    } else {
      //console.log('statusCode:' + response.statusCode);
      //console.log('error:' + JSON.stringify(error));
      deferred.reject({statusCode:response.statusCode,error:error});
    }
  });

  return deferred.promise;

};

var getTokenInfo = function(token) {
  var deferred = q.defer();

  request(FBURL + 'me?access_token=' + token + '&fields=name,id,email',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body);
      var returnObj = JSON.parse(body);
      deferred.resolve(returnObj);
    } else {
      deferred.reject({statusCode:response.statusCode,error:error});
    }
  });
  return deferred.promise;
};

var validateAndReadToken = function(token) {
  var deferred = q.defer();
  validateToken(token).then(function(result) {
    var validateResult = result;
    getTokenInfo(token).then(function(result) {
      for (var attr in validateResult) {
        if (attr !== 'userID') { // same as id so it's redundant
          result[attr] = validateResult[attr];
        }
      }
      deferred.resolve(result);
    }, function(error) {
      error.errorStep = 'read';
      deferred.reject(error);
    });
  }, function(error) {
    error.errorStep = 'validation';
    deferred.reject(error);
  });
  return deferred.promise;
};

console.log('validateAndReadToken');
validateAndReadToken(token).then(function(result){
  console.log(result);
},function(error){
  console.log(error);
});


/***************************************************************************/
/*
        exports are:

          validateToken
          getTokenInfo
          validateAndReadToken

          see documentaion below
*/
/***************************************************************************/

exports.validateToken = validateToken; // just see if the token is valid
/*
  returns a promise
  success:  { secondsToExpiration: <integer | seconds>,
              isValid: <boolean>,
              expiresAt: <integer | unix date>,
              userID: <string | looks like a long integer>,
              isExpired: <boolean>
            }
  failure could look like success, only with an expired token value, or,
  { statusCode: 400, error: null } if the network call fails
*/

exports.getTokenInfo = getTokenInfo; // just get the info from a token
/*
  returns a promise
  success:  { name: <string>,
              id: <string | looks like a long integer>,
              email: <string | email address>
            }
  failure: { statusCode: 400, error: null }
*/
exports.validateAndReadToken = validateAndReadToken; // validate token then return info
/*
  returns a promise
  success:  { name: <string>,
              id: <string | looks like a long integer>,
              email: <string | email address>,
              secondsToExpiration: <integer | seconds>,
              isValid: <boolean>,
              expiresAt: <integer | unix date>,
              isExpired: <boolean>
            }
  failure:  returns same error object from validateToken or getTokenInfo
            plus one extra field:
            errorStep: <'read' or 'validation'>

  NOTE: an invalid token will return this:
          { secondsToExpiration: NaN,
            isValid: false,
            expiresAt: undefined,
            userID: undefined,
            isExpired: false,
            errorStep: 'validation'
          }
*/
