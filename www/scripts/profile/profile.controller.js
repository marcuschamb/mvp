(function() {
	'use strict';

	angular
		.module('barebone.profile')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['profileService'];

	/* @ngInject */
	function ProfileController(profileService) {
		var vm = angular.extend(this, {
			currentUser: null
		});

		(function activate() {
			vm.currentUser = profileService.getCurrentUser();
		})();


	}
})();
