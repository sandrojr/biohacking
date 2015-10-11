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
					},

					user: function(Security) {
						return Security.getUser();
					}
				}
			})

			.when('/add', {
				templateUrl: 'src/views/add.html',
				controller: 'AddController',
				controllerAs: 'vm',
				resolve: {
					database: function(Database) {
						return Database.initDB();
					}
				}
			})

			.when('/login', {
				templateUrl: 'src/views/login.html',
				controller: 'LoginController',
				controllerAs: 'vm',
				resolve: {
					database: function(Database) {
						return Database.initDB();
					}
				}
			})

			.when('/signup', {
				templateUrl: 'src/views/signup.html',
				controller: 'SignUpController',
				controllerAs: 'vm',
				resolve: {
					database: function(Database) {
						return Database.initDB();
					}
				}
			});
	}
})();
