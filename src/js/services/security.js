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
	    	registerUser: registerUser,
	    	onGoogleSignIn: onGoogleSignIn
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

	    function onGoogleSignIn(googleUser) {
			var profile = googleUser.getBasicProfile();

			Database.findBy('users', 'email', profile.getEmail()).then(function(result) {
				if (result.length) {
					var user = result[0];
					user.img = profile.getImageUrl();

					registerUser(user);
					loginSuccess();
				} else {
					Database.insert('users', {
						email: profile.getEmail(),
						password: 1234,
					}).then(function() {
						getUserByEmail(profile.getEmail()).then(function(user){
							user.img = profile.getImageUrl();
							registerUser(user);
							loginSuccess();
						});
					});
				}
			});
		};

		function loginSuccess() {
			window.location.replace("#/");
		}

	}

})();