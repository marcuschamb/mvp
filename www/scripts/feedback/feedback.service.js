(function () {
	'use strict';

	angular
		.module('barebone.feedback')
		.factory('feedbackService', feedbackService);

	feedbackService.$inject = ['$cordovaEmailComposer'];

	/* @ngInject */
	function feedbackService($cordovaEmailComposer) {

		var recipent = "chris@arcade.city";
		var subject  = "Arcade City App Feedback"

		var service = {
			sendEmail: sendEmail
		};
		return service;

		// ************************************************

		function sendEmail(body, attachments, position) {
			body = body ? body + '<br><br>' : '';
			_.each(position, function(item) {
				if (item.key && item.value)
				body += '<b>' + item.key + '</b>: ' + item.value + '<br>';
			});

			return $cordovaEmailComposer.isAvailable().then(function () {
				var email = {
					to: 					recipent,
					subject: 			subject,
					body: 				body,
					attachments: 	attachments,
					isHtml: true
				};

				$cordovaEmailComposer.open(email);
			}, function (er) {
				alert(er);
			});
		}
	}
})();
