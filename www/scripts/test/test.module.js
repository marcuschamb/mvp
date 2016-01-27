(function() {
	'use strict';

	angular
		.module('barebone.test', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.test', {
					url: '/test',
					views: {
						'menuContent': {
							templateUrl: 'scripts/test/test.html',
							controller: 'TestController as vm'
						}
					}
				});
		});
})();
