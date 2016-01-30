(function() {
	'use strict';

	angular
		.module('barebone.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['externalAppsService', '$ionicSideMenuDelegate', 'homeDataService',
				'$ionicHistory', '$state', '$rootScope'];

	/* @ngInject */
	function HomeController(externalAppsService, $ionicSideMenuDelegate, homeDataService,
				$ionicHistory, $state, $rootScope) {

		// do not allow the menu in this screen
		$ionicSideMenuDelegate.canDragContent(false);

		var vm = angular.extend(this, {
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

	}
})();
