(function() {
	'use strict';

	angular
		.module('barebone.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['externalAppsService', '$ionicSideMenuDelegate', 'homeDataService',
				'$ionicHistory', '$state', '$rootScope', 'oauthService'];

	/* @ngInject */
	function HomeController(externalAppsService, $ionicSideMenuDelegate, homeDataService,
				$ionicHistory, $state, $rootScope, oauthService) {

		// do not allow the menu in this screen
		$ionicSideMenuDelegate.canDragContent(false);

		var vm = angular.extend(this, {
			facebookLogin: facebookLogin,
			googleLogin: googleLogin,
			twitterLogin: twitterLogin,

			openFacebookPage: openFacebookPage,
			news: news
		});

		function openFacebookPage() {
			externalAppsService.openExternalUrl(homeDataService.facebookPage);
		}

		function news() {
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go($rootScope.returnToState || 'app.articles');
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
				//alert(JSON.stringify(result));
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go($rootScope.returnToState || 'app.welcome');
			});
		}




	}
})();
