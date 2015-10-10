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


	function init() {
		angular.element('.button-collapse').sideNav();
	}

})();
