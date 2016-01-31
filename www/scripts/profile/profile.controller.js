(function() {
	'use strict';

	angular
		.module('barebone.profile')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['profileService'];

	/* @ngInject */
	function ProfileController(profileService) {
		var vm = angular.extend(this, {
			currentUser: null,
			updateUserInfo: updateUserInfo
		});

		(function activate() {
			updateUserInfo();
		})();

		function updateUserInfo() {
			profileService.getCurrentUser().then(function(result){
				vm.currentUser = result;
			})
			.catch(function(err){
				console.log("profileService.getCurrentUser() error: " + JSON.stringify(err));
				vm.currentUser = null;
			});
		}


	}
})();
