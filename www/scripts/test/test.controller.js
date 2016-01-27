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
			checkToken: checkToken,
			response: ''
		});

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

		var sample = {"accessToken":"CAAHbbgBZBfZC8BADLXYZCo5POT9IahlPG3MT56G0JKwNTTRVJrXUM67eMEwkfbntVE6vttsnjDZCExdANOZCd8M34aAf3mgmeYO9bGyGnc6zUpQFIipLhp329Dcb9ZBVvSqY8zeMCHoZC85NhDYIWUTtpZBYFzf8G95rUzDTs4I7bHv0zCSGOQkGauhlcZCH9ldgZD",
							"source":"facebook"};


		function getOAuthToken() {
			return localStorageService.get(oauthTokenKey);
		}



	}
})();
