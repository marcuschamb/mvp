(function() {
	'use strict';

	angular
		.module('barebone.home')
		.factory('homeService', homeService);

	homeService.$inject = ['$http', '$q', 'localStorageService'];

	/* @ngInject */
	function homeService($http, $q, localStorageService) {
    var oauthTokenKey = 'oauthToken';

		var service = {
			serverLogin: serverLogin,
			getOAuthToken: getOAuthToken,
			getCurrentUser: getCurrentUser
		};
		return service;

		// *******************************************************

    function serverLogin() {
      var deferred = $q.defer();
			var url = 'https://dev001.arcade.city/login';
			var oauthToken = getOAuthToken();
			if (oauthToken) {
				$http.defaults.headers.common.oauthToken = oauthToken.accessToken;
				$http.defaults.headers.common.oauthService = oauthToken.source;
				$http.get(url)
				.then(function(resp) {
		        console.log('Transmission success: ' + JSON.stringify(resp));
						//vm.response = resp;
		        // For JSON responses, resp.data contains the result
            console.log('serverLogin resp: ' + JSON.stringify(resp));
						localStorageService.set('currentUser',resp.data);
						/*
						  "data": {
						    "name": "",
						    "email": "",
						    "_id": "",
						    "expiresAt": ,
						    "createdAt": ,
						    "lastLogin":
						  }
							*/
            deferred.resolve(resp);
		      }, function(err) {
		        console.error('Transmission error: ', JSON.stringify(err));
            deferred.reject({'err':err});
						//vm.response = err;
		        // err.status will contain the status code
		      });
			} else {
        deferred.reject({'message':'not logged in'});
				//alert('not logged in yet...');
        // we should redirect here...
			}

      return deferred.promise;
		}

    function getOAuthToken() {
			return localStorageService.get(oauthTokenKey);
		}
		function getCurrentUser() {
			return localStorageService.get('currentUser');
		}



	}
})();
