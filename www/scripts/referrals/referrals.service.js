(function() {
	'use strict';

	angular
		.module('barebone.referrals')
		.factory('referralsService', referralsService);

	referralsService.$inject = ['$http', '$q', 'localStorageService'];

	/* @ngInject */
	function referralsService($http, $q, localStorageService) {
    var oauthTokenKey = 'oauthToken';

		var service = {
			sendToServer: sendToServer
			//serverLogin: serverLogin
      //getCurrentUser: getCurrentUser
		};

		// *******************************************************

    (function activate() {

		})();

		/*
		http://api1.arcade.city/v1/referralsignup?type=[driver|rider]&name=[name]&email=[email]&referrerfbid=[fbid]
		*/

		function sendToServer(form) {
			//{"name":"Mark b","email":"asdfasdf@adsfasdf.com","ride":true}
			form.referrerfbid = localStorageService.get('currentUser')._id.replace('facebook-','');
			var url = 'http://api1.arcade.city/v1/referralsignup';
      var deferred = $q.defer();

				$http.get(url,{'params':form})
				.then(function(resp) {
		        console.log('Transmission success: ' + JSON.stringify(resp));
            deferred.resolve(resp);
		      }, function(err) {
		        console.error('Transmission error: ', JSON.stringify(err));
            deferred.reject({'err':err});
						//vm.response = err;
		        // err.status will contain the status code
		      });
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
						localStorageService.set('currentUser',resp.data);
            deferred.resolve(resp.data);
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
