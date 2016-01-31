(function() {
	'use strict';

	angular
		.module('barebone.referrals')
		.controller('ReferralsController', ReferralsController);

	ReferralsController.$inject = ['referralsService'];

	/* @ngInject */
	function ReferralsController(referralsService) {
		var vm = angular.extend(this, {
			form: {},
			submit: submit
		});

		(function activate() {
			vm.form.type = 'rider';
		})();

/*
http://api1.arcade.city/v1/referralsignup.php?type=[driver|rider]&name=[name]&email=[email]&fbid=[fbid]
*/
		function submit() {
			//console.log(JSON.stringify(vm.form));
			referralsService.sendToServer(vm.form);
		}

	}
})();
