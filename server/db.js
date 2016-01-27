var restify = require('restify');
var q = require('q');
var PouchDB = require('pouchdb');
var config = require('./config');
var db = new PouchDB(config.CouchDBRoot);

var saveDoc = function(doc) {
  var deferred = q.defer();

  db.get(doc._id).then(function(old_doc) {
    doc._rev = old_doc._rev;
    return db.put(doc);
  }).then(function(response) {
    // handle response
    //console.log('update response: ' + JSON.stringify(response));
    deferred.resolve(response);
  }).catch(function (err) {
    if (err.status === 404) {
      db.put(doc).then(function(response){
        //console.log('new doc response: ' + JSON.stringify(response));
        deferred.resolve(response);
      }).catch(function (err) {
        //console.log('new doc error: ' + JSON.stringify(err));
        err.step = 'create';
        deferred.reject(err);
      });
    } else {
      //console.log('update error:' + JSON.stringify(err));
      err.step = 'update';
      deferred.reject(err);
    }
  });
  return deferred.promise;
};

var getDoc = function(_id) {
  var deferred = q.defer();
  db.get(_id).then(function (doc) {
    // handle doc
    //console.log(JSON.stringify(doc));
    deferred.resolve(doc);
  }).catch(function (err) {
    //console.log('getDoc error: ' + JSON.stringify(err));
    deferred.reject(err);
  });
  return deferred.promise;
};

exports.saveDoc = saveDoc;
exports.getDoc = getDoc;
