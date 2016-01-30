(function() {
	'use strict';

	angular
		.module('barebone.welcome', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.welcome', {
					url: '/welcome',
					views: {
						'menuContent': {
							templateUrl: 'scripts/welcome/welcome.html',
							controller: 'WelcomeController as vm'
						}
					}
				});
		});
})();
