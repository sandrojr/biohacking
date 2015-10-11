(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	function LoginController($rootScope, $route, $scope, $location, $window, Security, Database) {
		var vm = this;

		//Logout
		delete $window.localStorage['user'];
		$rootScope.user = null

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

