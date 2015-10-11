(function(){
	'use strict';

	angular
		.module('app')
		.controller('SignUpController', SignUpController);

	function SignUpController($route, $scope, $location, $window, Security, Database) {
		var vm = this;

		vm.submit = submit;

		////////////////////////////////////////////////
		
		function submit() {
			Database.findBy('users', 'email', vm.model.email).then(function(result) {
				if (result.length) {
					Materialize.toast('Sorry, already exists a user with this email! Choose another one.', 4000);
				} else {
					Database.insert('users', vm.model).then(function() {
						Security.getUserByEmail(vm.model.email).then(function(user){
							Security.registerUser(user);
							$location.path('/');
							$scope.$apply();
						});
					});
				}
			});
		}
	}

})();

