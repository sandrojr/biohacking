(function(){
	'use strict';

	angular
		.module('app')
		.controller('LogoutController', LogoutController);

	function LogoutController($rootScope, $window) {
		var vm = this;

	    logout();

		////////////////////////////////////////////////
		
		function logout() {
			delete $window.localStorage['user'];
			$rootScope.user = null;

			gapi.load('auth2', function() {
				if (gapi.auth2.getAuthInstance()) {
					gapi.auth2.getAuthInstance().signOut();
				}
				
				$window.location.replace('/');
		  	});
		}

	}

})();

