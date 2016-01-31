(function() {
	'use strict';

	angular
		.module('barebone.profile')
		.factory('profileService', profileService);

	profileService.$inject = ['$http', '$q', 'localStorageService'];

	/* @ngInject */
	function profileService($http, $q, localStorageService) {
    var oauthTokenKey = 'oauthToken';

		var service = {
			//serverLogin: serverLogin
      getCurrentUser: getCurrentUser
		};

		// *******************************************************

    (function activate() {

		})();

    function getCurrentUser() {
      var deferred = $q.defer();
      //return localStorageService.get('currentUser');
      getMyProfile().then(function(result){
        deferred.resolve(result.data);
      }).catch(function(err){
        deferred.reject({'error':err});
      });
      return deferred.promise;
    }

    function getMyProfile() {
      var deferred = $q.defer();
			var url = 'https://dev001.arcade.city/me';
			var oauthToken = getOAuthToken();
			if (oauthToken) {
				$http.defaults.headers.common.oauthToken = oauthToken.accessToken;
				$http.defaults.headers.common.oauthService = oauthToken.source;
				$http.get(url)
				.then(function(resp) {
		        console.log('Transmission success: ' + JSON.stringify(resp));
						//vm.response = resp;
		        // For JSON responses, resp.data contains the result
            //console.log('getMyProfile resp: ' + JSON.stringify(resp));
            //console.log('localStorageService now has this: ' + JSON.stringify(localStorageService.get('currentUser')));
            //console.log('should we change it to this?');
            //console.log(JSON.stringify(resp.data));
						localStorageService.set('currentUser',resp.data);
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

    return service;

	}
})();
