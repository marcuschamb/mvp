(function() {
	'use strict';

	angular
		.module('barebone.referrals', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.referrals', {
					url: '/referrals',
					views: {
						'menuContent': {
							templateUrl: 'scripts/referrals/referrals.html',
							controller: 'ReferralsController as vm'
						}
					}
				});
		});
})();
