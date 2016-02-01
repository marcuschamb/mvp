// this sample proxy will proxy ALL requests, passing them onto CouchDB

var http = require('http'),
request = require('request'), // request module from https://github.com/mikeal/request
url = require('url');

http.createServer(function (req, res) {
  var href = url.parse(req.url,true).href;
  request('http://127.0.0.1:5984' + href).pipe(res);
}).listen(1337);
