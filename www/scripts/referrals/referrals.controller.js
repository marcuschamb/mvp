(function() {
	'use strict';

	angular
		.module('barebone.referrals')
		.controller('ReferralsController', ReferralsController);

	ReferralsController.$inject = ['referralsService'];

	/* @ngInject */
	function ReferralsController(referralsService) {
		var vm = angular.extend(this, {
		});

		(function activate() {

		})();


	}
})();
