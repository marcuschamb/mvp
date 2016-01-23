(function() {
	'use strict';

	angular
		.module('barebone.oauth')
		.factory('oauthFacebookService', oauthFacebookService);

	oauthFacebookService.$inject = ['$cordovaOauth', '$http', 'ENV'];

	/* @ngInject */
	function oauthFacebookService($cordovaOauth, $http, ENV) {
		var apiUrl = 'https://graph.facebook.com/v2.3/';

		var scope = ['email'];
		var service = {
			login: login,
			getProfile: getProfile
		};
		return service;

		function login() {
			var appId = ENV.facebookAppId;
			return $cordovaOauth.facebook(appId, scope).then(function(result) {
				console.log('Success');
				console.log(result);
				//alert(JSON.stringify(result));

				return result.access_token;
			}, function(error) {
				console.log('Error');
				console.log(error);
			});
		}

		function getProfile(authToken) {
			var params = getParams(authToken);
			//params.fields = 'id,name,email';
			params.fields = 'id,name,email';
			return $http.get(apiUrl + 'me?fields=id,name,email', params).then(function(result) {
				return {
					name: result.data.name,
					email: result.data.email,
					id: result.data.id
				};
			}, function(error) {
				console.log(error);
				alert('error:' + JSON.stringify(error));
			});
		}

		function getParams(accessToken) {
			return {
				params: {
					'access_token': accessToken,
					'format': 'json'
				}
			};
		}
	}
})();
