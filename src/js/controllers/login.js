(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	function LoginController($route, $scope, $location, $window, Security, Database) {
		var vm = this;

		//Logout
		delete $window.localStorage['user'];

		vm.submit = submit;

		////////////////////////////////////////////////
		
		function submit() {
			Security.doLogin(vm.model, loginSuccess, loginFail);
		}

		function loginSuccess() {
			$location.path('/');
			$scope.$apply();
		}

		function loginFail(msg) {
			Materialize.toast(msg, 4000);
		}
	}

})();

