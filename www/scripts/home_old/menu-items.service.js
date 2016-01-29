(function() {
	'use strict';

	angular
		.module('barebone.home')
		.factory('menuItems', menuItems);

	menuItems.$inject = [];

	/* @ngInject */
	function menuItems() {
		var data = [{
			title: 'News',
			path: 'articles',
			icon: 'ion-speakerphone'
		}, {
			title: 'Map',
			path: 'map',
			icon: 'ion-map'
		}];

		return data;
	}
})();
