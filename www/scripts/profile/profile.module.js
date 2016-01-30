(function() {
	'use strict';

	angular
		.module('barebone.profile', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.profile', {
					url: '/profile',
					views: {
						'menuContent': {
							templateUrl: 'scripts/profile/profile.html',
							controller: 'ProfileController as vm'
						}
					}
				});
		});
})();
