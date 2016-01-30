(function() {
	'use strict';

	angular
		.module('barebone.test')
		.controller('TestController', TestController);

	TestController.$inject = ['$http', 'localStorageService', 'positionService'];

	/* @ngInject */
	function TestController($http, localStorageService, positionService) {
		var oauthTokenKey = 'oauthToken';
		var vm = angular.extend(this, {
			testLogin: testLogin,
			checkToken: checkToken,
			testServer: testServer,
			response: ''
		});

		var lat;
		var lon;

		positionService.getCurrentPosition()
			.then(function(params) {
				console.log('positionService:');
				console.log(JSON.stringify(params));
				for (var i=0; i < params.length; i++) {
					switch (params[i].key) {
						case 'latitude':
							lat = params[i].value;
							break;
						case 'longitude':
							lon = params[i].value;
							break;
						default:
							break;
					}
				}
			})
			.catch(function(err){
				console.log('positionService err: ' + JSON.stringify(err));
			})
			.finally(function() {
				console.log('positionService finally...');
			});


		function testServer() {

		  //var url = 'http://192.168.1.104:4433/test/testcontoller';
			var servers = [
				{
					'ip':'dev003.arcade.city',
					'name':'do-sfo1-01',
					'location':{'lat':37.774929,'lon':-122.419416}
				},
				{
					'ip':'dev001.arcade.city',
					'name':'do-nyc1-01',
					'location':{'lat':40.712784,'lon':-74.005941}
				},
				{
					'ip':'dev002.arcade.city',
					'name':'do-tor1-01',
					'location':{'lat':43.653226,'lon':-79.383184}
				}
			];

			//alert(calcCrow(59.3293371,13.4877472,59.3225525,13.4619422).toFixed(1));


			Array.prototype.sortBy = function(p) {
			  return this.slice(0).sort(function(a,b) {
			    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
			  });
			};

			var output = [];
			function test() {
				if (servers.length === 0) {
					//output.sort()
					vm.response = JSON.stringify(output.sortBy('time')).replace(/\},/g,"},<br/>");
					return;
				}
				var server = servers.shift();
				var distance = Math.round(calcCrow(lat,lon,server.location.lat,server.location.lon));

				var url = 'https://' + server.ip + '/ping';
				var startTime = (+new Date());
			  $http.get(url)
			    .then(function(resp) {
						var endTime = (+new Date());
						console.log('time: ' + (endTime-startTime));
			      console.log('Transmission success: ' + JSON.stringify(resp));
			      vm.response = server.name + ': ' + resp.data + ' (' + (endTime-startTime) + 'ms)<br/>';
						output.push({'name':server.name,'time':(endTime-startTime),'distance':distance});
						test();
			      // For JSON responses, resp.data contains the result
			    }, function(err) {
			      console.error('Transmission error: ', JSON.stringify(err));
			      vm.response = JSON.stringify(err);
						output.push({'name':server.name,'time':9999,'distance':distance});
						test();
			      // err.status will contain the status code
			    });



			}
			test();
		}

		function testLogin() {
			var url = 'http://192.168.1.104:4433/login';
			var oauthToken = getOAuthToken();
			if (vm.oauthToken) {
				$http.defaults.headers.common.oauthToken = vm.oauthToken.accessToken;
				$http.defaults.headers.common.oauthService = vm.oauthToken.source;
				$http.get(url)
				.then(function(resp) {
		        console.log('Transmission success: ' + JSON.stringify(resp));
						vm.response = resp;
		        // For JSON responses, resp.data contains the result
		      }, function(err) {
		        console.error('Transmission error: ', JSON.stringify(err));
						vm.response = err;
		        // err.status will contain the status code
		      });
			} else {
				alert('not logged in yet...');
			}
		}

		function checkToken() {
			var oauthToken = getOAuthToken();
			console.log('oauthToken:');
			console.log(JSON.stringify(oauthToken));
			vm.oauthToken = oauthToken;
			if (vm.oauthToken) {
				console.log('we have a token');
			} else {
				console.log('we have no token');
				vm.oathToken = {'accessToken':null,'source':null};
			}

			/*
			var req = {
			 method: 'POST',
			 url: 'http://example.com',
			 headers: {
			   'Content-Type': undefined
			 },
			 data: { test: 'test' }
		 	};
		 */
		 var url = 'http://192.168.1.104:4433/test/testcontoller';

		 /*
			var headers = {
				'oauthToken': vm.oauthToken.accessToken,
				'oauthService': vm.oauthToken.source
			};
			*/

			//$http(req).then(function(){...}, function(){...});
			//console.log('Ready to send request now...');
			if (vm.oauthToken) {
				$http.defaults.headers.common.oauthToken = vm.oauthToken.accessToken;
				$http.defaults.headers.common.oauthService = vm.oauthToken.source;
			}
			//$http.defaults.headers.common['X-Key'] = 'ABC';

			$http.get(url/*,{headers:{'oauthToken':vm.oauthToken.accessToken,'oauthService':vm.oauthToken.source}}*/)
			.then(function(resp) {
	        console.log('Transmission success: ' + JSON.stringify(resp));
					vm.response = resp;
	        // For JSON responses, resp.data contains the result
	      }, function(err) {
	        console.error('Transmission error: ', JSON.stringify(err));
					vm.response = err;
	        // err.status will contain the status code
	      });

		}

		// ********************************************************************


		function getOAuthToken() {
			return localStorageService.get(oauthTokenKey);
		}



		//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
		    function calcCrow(lat1, lon1, lat2, lon2)
		    {
		      var R = 6371; // km
		      var dLat = toRad(lat2-lat1);
		      var dLon = toRad(lon2-lon1);
		      lat1 = toRad(lat1);
		      lat2 = toRad(lat2);

		      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
		      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		      var d = R * c;
		      return d;
		    }

		    // Converts numeric degrees to radians
		    function toRad(Value)
		    {
		        return Value * Math.PI / 180;
		    }



	}
})();
