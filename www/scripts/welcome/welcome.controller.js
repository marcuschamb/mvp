(function() {
	'use strict';

	angular
		.module('barebone.welcome')
		.controller('WelcomeController', WelcomeController);

	WelcomeController.$inject = ['localStorageService'];

	/* @ngInject */
	function WelcomeController(localStorageService) {
		var vm = angular.extend(this, {
			currentUser: {}
		});

		(function activate() {
			vm.currentUser = getCurrentUser();
			var createdAt = new Date(vm.currentUser.createdAt*1000);//.toLocaleDateString();
			var lastLogin = new Date(vm.currentUser.lastLogin*1000);//.toLocaleTimeString();
			var expiresAt = new Date(vm.currentUser.providerInfo.expiresAt*1000);//.toLocaleTimeString();

			vm.currentUser.createdAtLocal = createdAt.toLocaleDateString() + ' ' + createdAt.toLocaleTimeString();
			vm.currentUser.lastLoginLocal = lastLogin.toLocaleDateString() + ' ' + lastLogin.toLocaleTimeString();
			vm.currentUser.expiresAtLocal = expiresAt.toLocaleDateString() + ' ' + expiresAt.toLocaleTimeString();
		})();

		/*******************************************************************/

		function getCurrentUser() {
			return localStorageService.get('currentUser');
		}

	}
})();
