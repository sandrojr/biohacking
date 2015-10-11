(function(){
	'use strict';

	angular
		.module('app')
		.factory('Security', Security);

	function Security(Database, $window, $location) {

	    return {
	    	getUser: getUser,
	    	getUserByEmail: getUserByEmail,
	    	doLogin: doLogin,
	    	registerUser: registerUser
	    };

	    ////////////////////////////////////////////////////////////////////////

	    function getUser() {
	    	if ($window.localStorage['user']) {
	    		return angular.fromJson($window.localStorage['user']);	
	    	}
	    	
	    	$location.path('/login');
	    }

	    function getUserByEmail(email) {
	    	return Database.findBy('users', 'email', email).then(function(result) {
				return result[0];
			});
	    }

	    function registerUser(user) {
	    	$window.localStorage['user'] = angular.toJson(user);
	    }

	    function doLogin(model, fnSuccess, fnFail) {
	    	var errorMsg = 'Sorry, check your e-mail or password and try again!';

	    	Database.findBy('users', 'email', model.email).then(function(result) {
				if (result.length) {
					var user = result[0];

					if (user.password == model.password) {
						registerUser(user);
						fnSuccess(user);
						return;
					}
				}
				
				fnFail(errorMsg);
			});
	    }

	}

})();