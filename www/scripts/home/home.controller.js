(function() {
	'use strict';

	angular
		.module('barebone.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['externalAppsService', '$ionicSideMenuDelegate', 'homeDataService',
				'$ionicHistory', '$state', '$rootScope', 'oauthService', 'localStorageService', 'homeService'];

	/* @ngInject */
	function HomeController(externalAppsService, $ionicSideMenuDelegate, homeDataService,
				$ionicHistory, $state, $rootScope, oauthService, localStorageService, homeService) {

		// do not allow the menu in this screen
		$ionicSideMenuDelegate.canDragContent(false);

		var vm = angular.extend(this, {
			facebookLogin: facebookLogin,
			googleLogin: googleLogin,
			twitterLogin: twitterLogin,

			openFacebookPage: openFacebookPage
		});

		function openFacebookPage() {
			externalAppsService.openExternalUrl(homeDataService.facebookPage);
		}

		function facebookLogin() {
			login('facebook');
		}

		function googleLogin() {
			login('google');
		}

		function twitterLogin() {
			login('twitter');
		}

		function login(source) {
			oauthService.login(source).then(function(result) {
				//debugger;
				/*
					result has:  { accessToken: 'AAAbxadfda34...', source: 'facebook'}
				*/
				homeService.serverLogin()
				.then(function(result){

					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$state.go($rootScope.returnToState || 'app.welcome');

				}).catch(function(err){
					console.log('serverLogin err: ' + JSON.stringify(err));
				});

			});
		}




	}
})();
