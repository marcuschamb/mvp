var restify = require('restify');
var q = require('q');
var config = require('./config');

var couch = function(req, res, next) {
  //console.log('couch function...');
  var client = restify.createClient({
    url: config.CouchDBRoot
  });

  client.get('/db/_design/design_doc/_view/view_name&include_docs=true', function(err, req) {
    //assert.ifError(err); // connection error
    res.charSet('utf-8');

    req.on('result', function(err, res1) {

      res1.setEncoding('utf8');
      res1.on('data', function(chunk) {

        res.write(chunk);
      });

      res1.on('end', function() {
        res.end();
      });
    });
  });

};
