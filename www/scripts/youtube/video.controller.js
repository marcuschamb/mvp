(function() {
	'use strict';

	angular
		.module('barebone.youtube')
		.controller('VideoController', VideoController);

	VideoController.$inject = ['$stateParams', 'youtubeService'];

	/* @ngInject */
	function VideoController($stateParams, youtubeService) {
		var videoId = $stateParams.videoId;

		var vm = angular.extend(this, {
			video: null
		});

		(function active() {
			getVideo();
		})();

		// ********************************************************************

		function getVideo() {
			youtubeService.getVideo(videoId)
				.then(function(video) {
					vm.video = video;
				});
		}

	}
})();