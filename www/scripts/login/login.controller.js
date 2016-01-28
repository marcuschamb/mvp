(function() {
	'use strict';

	angular
		.module('barebone.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$http', 'localStorageService'];

	/* @ngInject */
	function LoginController($http, localStorageService) {
		var oauthTokenKey = 'oauthToken';
		var vm = angular.extend(this, {
			testLogin: testLogin,
			checkToken: checkToken,
			response: '',
			facebookLogin: facebookLogin
		});

		function facebookLogin() {
			alert('not ready yet... try again later');
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

		 var url = 'http://192.168.1.104:4433/test/testcontoller';

			if (vm.oauthToken) {
				$http.defaults.headers.common.oauthToken = vm.oauthToken.accessToken;
				$http.defaults.headers.common.oauthService = vm.oauthToken.source;
			}

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
