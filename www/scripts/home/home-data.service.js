(function() {
	'use strict';

	angular
		.module('barebone.home')
		.factory('homeDataService', homeDataService);

	homeDataService.$inject = [];

	/* @ngInject */
	function homeDataService() {
		return {
			phoneNumber: '+8005551212',
			email: 'chris@arcade.city',
			officeLocation: '43.0562442,-70.8111592',
			facebookPage: 'https://www.facebook.com/ArcadeCityHall'
		};
	}
})();
