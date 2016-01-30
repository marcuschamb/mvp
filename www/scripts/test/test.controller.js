(function() {
	'use strict';

	angular
		.module('barebone.test')
		.controller('TestController', TestController);

	TestController.$inject = ['$http', 'localStorageService'];

	/* @ngInject */
	function TestController($http, localStorageService) {
		var oauthTokenKey = 'oauthToken';
		var vm = angular.extend(this, {
			testLogin: testLogin,
			checkToken: checkToken,
			testServer: testServer,
			response: ''
		});

		function testServer() {
		  //var url = 'http://192.168.1.104:4433/test/testcontoller';
			var servers = [
				{
					'ip':'dev003.arcade.city',
					'name':'do-sfo1-01'
				},
				{
					'ip':'dev001.arcade.city',
					'name':'do-nyc1-01'
				},
				{
					'ip':'dev002.arcade.city',
					'name':'do-tor1-01'
				}
			];


			Array.prototype.sortBy = function(p) {
			  return this.slice(0).sort(function(a,b) {
			    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
			  });
			};

			var output = [];
			function test() {
				if (servers.length === 0) {
					//output.sort()
					vm.response = JSON.stringify(output.sortBy('time')).replace(/\},/g,"},<br/>");
					return;
				}
				var server = servers.shift();

				var url = 'https://' + server.ip + '/ping';
				var startTime = (+new Date());
			  $http.get(url)
			    .then(function(resp) {
						var endTime = (+new Date());
						console.log('time: ' + (endTime-startTime));
			      console.log('Transmission success: ' + JSON.stringify(resp));
			      vm.response = server.name + ': ' + resp.data + ' (' + (endTime-startTime) + 'ms)<br/>';
						output.push({'name':server.name,'time':(endTime-startTime)});
						test();
			      // For JSON responses, resp.data contains the result
			    }, function(err) {
			      console.error('Transmission error: ', JSON.stringify(err));
			      vm.response = JSON.stringify(err);
						output.push({'name':server.name,'time':9999});
						test();
			      // err.status will contain the status code
			    });



			}
			test();
		}

		function testLogin() {
			var url = 'http://192.168.1.104:4433/login';
			var oauthToken = getOAuthToken();
			if (vm.oauthToken) {
				$http.defaults.headers.common.oauthToken = vm.oauthToken.accessToken;
				$http.defaults.headers.common.oauthService = vm.oauthToken.source;
				$http.get(url)
				.then(function(resp) {
		        console.log('Transmission success: ' + JSON.stringify(resp));
						vm.response = resp;
		        // For JSON responses, resp.data contains the result
		      }, function(err) {
		        console.error('Transmission error: ', JSON.stringify(err));
						vm.response = err;
		        // err.status will contain the status code
		      });
			} else {
				alert('not logged in yet...');
			}
		}

		function checkToken() {
			var oauthToken = getOAuthToken();
			console.log('oauthToken:');
			console.log(JSON.stringify(oauthToken));
			vm.oauthToken = oauthToken;
			if (vm.oauthToken) {
				console.log('we have a token');
			} else {
				console.log('we have no token');
				vm.oathToken = {'accessToken':null,'source':null};
			}

			/*
			var req = {
			 method: 'POST',
			 url: 'http://example.com',
			 headers: {
			   'Content-Type': undefined
			 },
			 data: { test: 'test' }
		 	};
		 */
		 var url = 'http://192.168.1.104:4433/test/testcontoller';

		 /*
			var headers = {
				'oauthToken': vm.oauthToken.accessToken,
				'oauthService': vm.oauthToken.source
			};
			*/

			//$http(req).then(function(){...}, function(){...});
			//console.log('Ready to send request now...');
			if (vm.oauthToken) {
				$http.defaults.headers.common.oauthToken = vm.oauthToken.accessToken;
				$http.defaults.headers.common.oauthService = vm.oauthToken.source;
			}
			//$http.defaults.headers.common['X-Key'] = 'ABC';

			$http.get(url/*,{headers:{'oauthToken':vm.oauthToken.accessToken,'oauthService':vm.oauthToken.source}}*/)
			.then(function(resp) {
	        console.log('Transmission success: ' + JSON.stringify(resp));
					vm.response = resp;
	        // For JSON responses, resp.data contains the result
	      }, function(err) {
	        console.error('Transmission error: ', JSON.stringify(err));
					vm.response = err;
	        // err.status will contain the status code
	      });

		}

		// ********************************************************************


		function getOAuthToken() {
			return localStorageService.get(oauthTokenKey);
		}



	}
})();
