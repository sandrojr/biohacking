(function(){
	'use strict';

	angular
		.module('app')
		.config(RouteConfig);

	function RouteConfig($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'src/views/main.html',
				controller: 'MainController',
				controllerAs: 'vm',
				resolve: {
					database: function(Database) {
						return Database.initDB();
					}
				}
			})

			.when('/add', {
				templateUrl: 'src/views/add.html',
				controller: 'AddController',
				controllerAs: 'vm',
				resolve: {
					database: function(Database) {
						Database.initDB();
					}
				}
			});
	}
})();
