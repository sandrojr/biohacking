(function(){
	'use strict';

	var modules = [
		'ngRoute',
		'angularMoment',
		'ngSanitize'
	];

	angular
		.module('app', modules)
		.run(init);


	function init($window) {
		angular.element('.button-collapse').sideNav();
	}

})();
