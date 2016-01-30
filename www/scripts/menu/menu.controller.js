(function() {
	'use strict';

	angular
		.module('barebone.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['oauthService','$ionicHistory','$state'];

	/* @ngInject */
	function MenuController(oauthService, $ionicHistory, $state) {

		var vm = angular.extend(this, {
			logout: logout
		});


		function logout() {
			oauthService.logout();
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('app.home');
		}


	}
})();
